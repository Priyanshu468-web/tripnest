package com.tripnest.service;

import com.tripnest.dto.response.BudgetDto;
import com.tripnest.entity.Budget;
import com.tripnest.entity.Expense;
import com.tripnest.entity.Trip;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.exception.UnauthorizedException;
import com.tripnest.repository.BudgetRepository;
import com.tripnest.repository.ExpenseRepository;
import com.tripnest.repository.TripMemberRepository;
import com.tripnest.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final ExpenseRepository expenseRepository;
    private final TripRepository tripRepository;
    private final TripMemberRepository tripMemberRepository;

    public BudgetService(BudgetRepository budgetRepository, ExpenseRepository expenseRepository,
                         TripRepository tripRepository, TripMemberRepository tripMemberRepository) {
        this.budgetRepository = budgetRepository;
        this.expenseRepository = expenseRepository;
        this.tripRepository = tripRepository;
        this.tripMemberRepository = tripMemberRepository;
    }

    public BudgetDto getBudgetDetails(Long tripId, String email) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(tripId, email);
        if (!isMember) {
            throw new UnauthorizedException("Not authorized to view budget details");
        }

        Budget budget = budgetRepository.findByTripId(tripId)
                .orElseGet(() -> budgetRepository.save(Budget.builder()
                        .trip(trip)
                        .allocated(trip.getBudget() != null ? trip.getBudget() : BigDecimal.ZERO)
                        .build()));

        List<Expense> expenses = expenseRepository.findByTripIdOrderByDateDesc(tripId);

        BigDecimal spent = BigDecimal.ZERO;
        Map<String, BigDecimal> byCategory = new HashMap<>();

        for (Expense exp : expenses) {
            spent = spent.add(exp.getAmount());
            String cat = exp.getCategory();
            byCategory.put(cat, byCategory.getOrDefault(cat, BigDecimal.ZERO).add(exp.getAmount()));
        }

        BigDecimal remaining = budget.getAllocated().subtract(spent);

        BigDecimal pctUsed = BigDecimal.ZERO;
        if (budget.getAllocated().compareTo(BigDecimal.ZERO) > 0) {
            pctUsed = spent.divide(budget.getAllocated(), 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .setScale(2, RoundingMode.HALF_UP);
        }

        return BudgetDto.builder()
                .allocated(budget.getAllocated())
                .spent(spent)
                .remaining(remaining)
                .pctUsed(pctUsed)
                .byCategory(byCategory)
                .build();
    }

    @Transactional
    public BudgetDto updateBudget(Long tripId, BigDecimal allocated, String email) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(tripId, email);
        if (!isMember) {
            throw new UnauthorizedException("Not authorized to update budget details");
        }

        Budget budget = budgetRepository.findByTripId(tripId)
                .orElseGet(() -> Budget.builder().trip(trip).build());

        budget.setAllocated(allocated != null ? allocated : BigDecimal.ZERO);
        budgetRepository.save(budget);

        // Also sync trip.budget
        trip.setBudget(budget.getAllocated());
        tripRepository.save(trip);

        return getBudgetDetails(tripId, email);
    }
}
