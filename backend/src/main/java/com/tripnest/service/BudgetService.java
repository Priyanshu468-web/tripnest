package com.tripnest.service;

import com.tripnest.dto.BudgetDto;
import com.tripnest.entity.Budget;
import com.tripnest.entity.Trip;
import com.tripnest.entity.User;
import com.tripnest.repository.BudgetRepository;
import com.tripnest.repository.ExpenseRepository;
import com.tripnest.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final ExpenseRepository expenseRepository;
    private final TripRepository tripRepository;
    private final TripService tripService;
    private final AuthService authService;

    @Autowired
    public BudgetService(BudgetRepository budgetRepository, ExpenseRepository expenseRepository, TripRepository tripRepository, TripService tripService, AuthService authService) {
        this.budgetRepository = budgetRepository;
        this.expenseRepository = expenseRepository;
        this.tripRepository = tripRepository;
        this.tripService = tripService;
        this.authService = authService;
    }

    public BudgetDto getBudgetByTrip(Long tripId) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateAccess(trip, currentUser);

        Budget budget = budgetRepository.findByTripId(tripId)
                .orElseGet(() -> createDefaultBudget(tripId, trip.getBudget()));

        return calculateAndMapDto(budget);
    }

    @Transactional
    public BudgetDto saveOrUpdateBudget(Long tripId, BudgetDto dto) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateModifyPermission(trip, currentUser);

        if (dto.getTotalBudget() == null || dto.getTotalBudget() < 0) {
            throw new IllegalArgumentException("Total budget cannot be negative");
        }

        Budget budget = budgetRepository.findByTripId(tripId)
                .orElseGet(() -> Budget.builder().tripId(tripId).build());

        budget.setTotalBudget(dto.getTotalBudget());
        if (dto.getNotes() != null) {
            budget.setNotes(dto.getNotes());
        }

        trip.setBudget(dto.getTotalBudget());
        tripRepository.save(trip);

        Budget saved = budgetRepository.save(budget);
        return calculateAndMapDto(saved);
    }

    private Budget createDefaultBudget(Long tripId, Double initialBudget) {
        Budget budget = Budget.builder()
                .tripId(tripId)
                .totalBudget(initialBudget != null ? initialBudget : 0.0)
                .totalExpenses(0.0)
                .build();
        return budgetRepository.save(budget);
    }

    public BudgetDto calculateAndMapDto(Budget budget) {
        Double totalExpenses = expenseRepository.findByTripId(budget.getTripId())
                .stream().mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0).sum();

        Double totalBudget = budget.getTotalBudget() != null ? budget.getTotalBudget() : 0.0;
        Double remainingBudget = totalBudget - totalExpenses;
        Double utilization = totalBudget > 0 ? (totalExpenses / totalBudget) * 100.0 : 0.0;

        return BudgetDto.builder()
                .id(budget.getId())
                .tripId(budget.getTripId())
                .totalBudget(totalBudget)
                .totalExpenses(totalExpenses)
                .remainingBudget(remainingBudget)
                .budgetUtilization(utilization)
                .notes(budget.getNotes())
                .build();
    }
}
