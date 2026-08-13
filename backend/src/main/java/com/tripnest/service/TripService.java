package com.tripnest.service;

import com.tripnest.dto.TripDto;
import com.tripnest.entity.Budget;
import com.tripnest.entity.Trip;
import com.tripnest.entity.TripMember;
import com.tripnest.entity.User;
import com.tripnest.entity.enums.MemberRole;
import com.tripnest.entity.enums.MemberStatus;
import com.tripnest.entity.enums.TripStatus;
import com.tripnest.repository.BudgetRepository;
import com.tripnest.repository.ExpenseRepository;
import com.tripnest.repository.TripMemberRepository;
import com.tripnest.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final BudgetRepository budgetRepository;
    private final ExpenseRepository expenseRepository;
    private final TripMemberRepository tripMemberRepository;
    private final AuthService authService;

    @Autowired
    public TripService(TripRepository tripRepository, BudgetRepository budgetRepository, ExpenseRepository expenseRepository, TripMemberRepository tripMemberRepository, AuthService authService) {
        this.tripRepository = tripRepository;
        this.budgetRepository = budgetRepository;
        this.expenseRepository = expenseRepository;
        this.tripMemberRepository = tripMemberRepository;
        this.authService = authService;
    }

    @Transactional
    public TripDto createTrip(TripDto tripDto) {
        User currentUser = authService.getCurrentUser();

        Trip trip = Trip.builder()
                .destination(tripDto.getDestination())
                .startDate(tripDto.getStartDate())
                .endDate(tripDto.getEndDate())
                .travelers(tripDto.getTravelers() != null ? tripDto.getTravelers() : 1)
                .budget(tripDto.getBudget() != null ? tripDto.getBudget() : 0.0)
                .description(tripDto.getDescription())
                .status(tripDto.getStatus() != null ? tripDto.getStatus() : TripStatus.PLANNING)
                .owner(currentUser)
                .build();

        Trip savedTrip = tripRepository.save(trip);

        Budget budget = Budget.builder()
                .tripId(savedTrip.getId())
                .totalBudget(savedTrip.getBudget())
                .totalExpenses(0.0)
                .build();
        budgetRepository.save(budget);

        TripMember ownerMember = TripMember.builder()
                .tripId(savedTrip.getId())
                .userId(currentUser.getId())
                .userEmail(currentUser.getEmail())
                .userName(currentUser.getName())
                .role(MemberRole.OWNER)
                .status(MemberStatus.ACCEPTED)
                .build();
        tripMemberRepository.save(ownerMember);

        return mapToDto(savedTrip);
    }

    public List<TripDto> getMyTrips() {
        User currentUser = authService.getCurrentUser();
        List<Trip> trips = tripRepository.findAllAccessibleTripsForUser(currentUser.getId());
        return trips.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<TripDto> getAllTrips() {
        return tripRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public TripDto getTripById(Long id) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + id));

        validateAccess(trip, currentUser);

        return mapToDto(trip);
    }

    @Transactional
    public TripDto updateTrip(Long id, TripDto tripDto) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + id));

        validateModifyPermission(trip, currentUser);

        if (tripDto.getDestination() != null) trip.setDestination(tripDto.getDestination());
        if (tripDto.getStartDate() != null) trip.setStartDate(tripDto.getStartDate());
        if (tripDto.getEndDate() != null) trip.setEndDate(tripDto.getEndDate());
        if (tripDto.getTravelers() != null) trip.setTravelers(tripDto.getTravelers());
        if (tripDto.getDescription() != null) trip.setDescription(tripDto.getDescription());
        if (tripDto.getStatus() != null) trip.setStatus(tripDto.getStatus());

        if (tripDto.getBudget() != null) {
            trip.setBudget(tripDto.getBudget());
            Optional<Budget> budgetOpt = budgetRepository.findByTripId(id);
            if (budgetOpt.isPresent()) {
                Budget budget = budgetOpt.get();
                budget.setTotalBudget(tripDto.getBudget());
                budgetRepository.save(budget);
            }
        }

        Trip updatedTrip = tripRepository.save(trip);
        return mapToDto(updatedTrip);
    }

    @Transactional
    public void deleteTrip(Long id) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + id));

        validateOwnerOnlyPermission(trip, currentUser);

        budgetRepository.findByTripId(id).ifPresent(budgetRepository::delete);
        List<TripMember> members = tripMemberRepository.findByTripId(id);
        tripMemberRepository.deleteAll(members);

        tripRepository.delete(trip);
    }

    public void validateAccess(Trip trip, User user) {
        if (trip.getOwner().getId().equals(user.getId())) return;
        Optional<TripMember> memberOpt = tripMemberRepository.findByTripIdAndUserId(trip.getId(), user.getId());
        if (memberOpt.isPresent() && memberOpt.get().getStatus() == MemberStatus.ACCEPTED) return;
        throw new RuntimeException("Access Denied: You do not have access to this trip");
    }

    public void validateModifyPermission(Trip trip, User user) {
        if (trip.getOwner().getId().equals(user.getId())) return;
        Optional<TripMember> memberOpt = tripMemberRepository.findByTripIdAndUserId(trip.getId(), user.getId());
        if (memberOpt.isPresent() && memberOpt.get().getStatus() == MemberStatus.ACCEPTED &&
                (memberOpt.get().getRole() == MemberRole.OWNER || memberOpt.get().getRole() == MemberRole.GROUP_ADMIN)) {
            return;
        }
        throw new RuntimeException("Access Denied: Only OWNER or GROUP_ADMIN can modify this trip");
    }

    public void validateOwnerOnlyPermission(Trip trip, User user) {
        if (!trip.getOwner().getId().equals(user.getId())) {
            throw new RuntimeException("Access Denied: Only the Trip OWNER can perform this operation");
        }
    }

    public TripDto mapToDto(Trip trip) {
        Double totalExpenses = expenseRepository.findByTripId(trip.getId())
                .stream().mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0).sum();
        Double totalBudget = trip.getBudget() != null ? trip.getBudget() : 0.0;
        Double remainingBudget = totalBudget - totalExpenses;
        Double budgetUtilization = totalBudget > 0 ? (totalExpenses / totalBudget) * 100.0 : 0.0;

        return TripDto.builder()
                .id(trip.getId())
<<<<<<< HEAD
                .title(trip.getTitle())
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                .destination(trip.getDestination())
                .startDate(trip.getStartDate())
                .endDate(trip.getEndDate())
                .travelers(trip.getTravelers())
                .budget(totalBudget)
                .description(trip.getDescription())
                .status(trip.getStatus())
                .ownerId(trip.getOwner().getId())
                .ownerName(trip.getOwner().getName())
                .ownerEmail(trip.getOwner().getEmail())
                .totalSpent(totalExpenses)
                .remainingBudget(remainingBudget)
                .budgetUtilization(budgetUtilization)
                .createdAt(trip.getCreatedAt())
                .build();
    }
}
