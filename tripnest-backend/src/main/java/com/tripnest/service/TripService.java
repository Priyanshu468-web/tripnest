package com.tripnest.service;

import com.tripnest.dto.request.CreateTripRequest;
import com.tripnest.dto.response.TripDto;
import com.tripnest.dto.response.TripMemberDto;
import com.tripnest.dto.response.UserDto;
import com.tripnest.entity.Budget;
import com.tripnest.entity.Trip;
import com.tripnest.entity.TripMember;
import com.tripnest.entity.User;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.exception.UnauthorizedException;
import com.tripnest.repository.BudgetRepository;
import com.tripnest.repository.TripMemberRepository;
import com.tripnest.repository.TripRepository;
import com.tripnest.repository.UserRepository;
import com.tripnest.util.Constants;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final TripMemberRepository tripMemberRepository;
    private final UserRepository userRepository;
    private final BudgetRepository budgetRepository;

    public TripService(TripRepository tripRepository, TripMemberRepository tripMemberRepository,
                       UserRepository userRepository, BudgetRepository budgetRepository) {
        this.tripRepository = tripRepository;
        this.tripMemberRepository = tripMemberRepository;
        this.userRepository = userRepository;
        this.budgetRepository = budgetRepository;
    }

    @Transactional
    public TripDto createTrip(CreateTripRequest request, String creatorEmail) {
        User creator = userRepository.findByEmail(creatorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + creatorEmail));

        Trip trip = Trip.builder()
                .user(creator)
                .destination(request.getDestination())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .description(request.getDescription())
                .budget(request.getBudget() != null ? request.getBudget() : BigDecimal.ZERO)
                .imageUrl(request.getImageUrl())
                .isPublic(request.getIsPublic() != null ? request.getIsPublic() : false)
                .build();

        Trip savedTrip = tripRepository.save(trip);

        // Add creator as OWNER member
        TripMember member = TripMember.builder()
                .trip(savedTrip)
                .user(creator)
                .role(Constants.MEMBER_ROLE_OWNER)
                .build();
        tripMemberRepository.save(member);
        savedTrip.getMembers().add(member);

        // Auto-create Budget
        Budget budget = Budget.builder()
                .trip(savedTrip)
                .allocated(savedTrip.getBudget())
                .build();
        budgetRepository.save(budget);

        return mapToTripDto(savedTrip);
    }

    public List<TripDto> getTripsForUser(String email) {
        return tripRepository.findByMemberEmail(email).stream()
                .map(this::mapToTripDto)
                .collect(Collectors.toList());
    }

    public TripDto getTripById(Long id, String email) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));

        // Check if user is a member
        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(id, email);
        if (!isMember && !trip.getIsPublic()) {
            throw new UnauthorizedException("You are not authorized to view this trip");
        }

        return mapToTripDto(trip);
    }

    @Transactional
    public TripDto updateTrip(Long id, CreateTripRequest request, String email) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));

        // Check if user is the OWNER or a COLLABORATOR
        TripMember member = tripMemberRepository.findByTripIdAndUserEmail(id, email)
                .orElseThrow(() -> new UnauthorizedException("You are not authorized to modify this trip"));

        if (request.getDestination() != null) {
            trip.setDestination(request.getDestination());
        }
        if (request.getStartDate() != null) {
            trip.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            trip.setEndDate(request.getEndDate());
        }
        if (request.getDescription() != null) {
            trip.setDescription(request.getDescription());
        }
        if (request.getBudget() != null) {
            trip.setBudget(request.getBudget());
            // Sync with Budget record
            budgetRepository.findByTripId(id).ifPresent(b -> {
                b.setAllocated(request.getBudget());
                budgetRepository.save(b);
            });
        }
        if (request.getImageUrl() != null) {
            trip.setImageUrl(request.getImageUrl());
        }
        if (request.getIsPublic() != null) {
            trip.setIsPublic(request.getIsPublic());
        }

        Trip updatedTrip = tripRepository.save(trip);
        return mapToTripDto(updatedTrip);
    }

    @Transactional
    public void deleteTrip(Long id, String email) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));

        // Only owner can delete
        TripMember member = tripMemberRepository.findByTripIdAndUserEmail(id, email)
                .orElseThrow(() -> new UnauthorizedException("You are not authorized to delete this trip"));

        if (!Constants.MEMBER_ROLE_OWNER.equals(member.getRole())) {
            throw new UnauthorizedException("Only the trip owner can delete the trip");
        }

        tripRepository.delete(trip);
    }

    @Transactional
    public TripMemberDto addMember(Long tripId, String collaboratorEmail, String email) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        // Only members can invite
        boolean isInviterMember = tripMemberRepository.existsByTripIdAndUserEmail(tripId, email);
        if (!isInviterMember) {
            throw new UnauthorizedException("You must be a member of the trip to add collaborators");
        }

        User collaborator = userRepository.findByEmail(collaboratorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + collaboratorEmail));

        if (tripMemberRepository.existsByTripIdAndUserEmail(tripId, collaboratorEmail)) {
            throw new IllegalArgumentException("User is already a member of this trip");
        }

        TripMember newMember = TripMember.builder()
                .trip(trip)
                .user(collaborator)
                .role(Constants.MEMBER_ROLE_COLLABORATOR)
                .build();

        TripMember savedMember = tripMemberRepository.save(newMember);
        return mapToTripMemberDto(savedMember);
    }

    public TripDto mapToTripDto(Trip trip) {
        List<TripMemberDto> memberDtos = new ArrayList<>();
        if (trip.getMembers() != null) {
            memberDtos = trip.getMembers().stream()
                    .map(this::mapToTripMemberDto)
                    .collect(Collectors.toList());
        }

        return TripDto.builder()
                .id(trip.getId())
                .userId(trip.getUser().getId())
                .destination(trip.getDestination())
                .startDate(trip.getStartDate())
                .endDate(trip.getEndDate())
                .description(trip.getDescription())
                .budget(trip.getBudget())
                .status(trip.getStatus())
                .imageUrl(trip.getImageUrl())
                .isPublic(trip.getIsPublic())
                .createdAt(trip.getCreatedAt())
                .updatedAt(trip.getUpdatedAt())
                .members(memberDtos)
                .build();
    }

    public TripMemberDto mapToTripMemberDto(TripMember member) {
        UserDto userDto = UserDto.builder()
                .id(member.getUser().getId())
                .name(member.getUser().getName())
                .email(member.getUser().getEmail())
                .avatarUrl(member.getUser().getAvatarUrl())
                .role(member.getUser().getRole())
                .build();

        return TripMemberDto.builder()
                .id(member.getId())
                .user(userDto)
                .role(member.getRole())
                .joinedAt(member.getJoinedAt())
                .build();
    }
}
