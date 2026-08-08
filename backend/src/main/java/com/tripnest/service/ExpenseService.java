package com.tripnest.service;

import com.tripnest.dto.ExpenseDto;
import com.tripnest.dto.ExpenseSummaryDto;
import com.tripnest.entity.Budget;
import com.tripnest.entity.Expense;
import com.tripnest.entity.Trip;
import com.tripnest.entity.User;
import com.tripnest.entity.enums.ExpenseCategory;
import com.tripnest.repository.BudgetRepository;
import com.tripnest.repository.ExpenseRepository;
import com.tripnest.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final TripRepository tripRepository;
    private final BudgetRepository budgetRepository;
    private final TripService tripService;
    private final AuthService authService;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository, TripRepository tripRepository, BudgetRepository budgetRepository, TripService tripService, AuthService authService) {
        this.expenseRepository = expenseRepository;
        this.tripRepository = tripRepository;
        this.budgetRepository = budgetRepository;
        this.tripService = tripService;
        this.authService = authService;
    }

    @Transactional
    public ExpenseDto addExpense(Long tripId, ExpenseDto dto) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateAccess(trip, currentUser);

        if (dto.getAmount() == null || dto.getAmount() < 0) {
            throw new IllegalArgumentException("Expense amount cannot be negative");
        }

        Expense expense = Expense.builder()
                .tripId(tripId)
                .amount(dto.getAmount())
                .category(dto.getCategory() != null ? dto.getCategory() : ExpenseCategory.MISCELLANEOUS)
                .description(dto.getDescription())
                .expenseDate(dto.getExpenseDate() != null ? dto.getExpenseDate() : java.time.LocalDate.now())
                .paidBy(dto.getPaidBy() != null ? dto.getPaidBy() : currentUser.getName())
                .build();

        Expense saved = expenseRepository.save(expense);
        updateTripBudgetTotals(tripId);

        return mapToDto(saved);
    }

    public List<ExpenseDto> getExpensesByTrip(Long tripId) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateAccess(trip, currentUser);

        return expenseRepository.findByTripIdOrderByExpenseDateDesc(tripId)
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ExpenseDto getExpenseById(Long tripId, Long expenseId) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateAccess(trip, currentUser);

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getTripId().equals(tripId)) {
            throw new IllegalArgumentException("Expense does not belong to the specified trip");
        }

        return mapToDto(expense);
    }

    @Transactional
    public ExpenseDto updateExpense(Long tripId, Long expenseId, ExpenseDto dto) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateAccess(trip, currentUser);

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getTripId().equals(tripId)) {
            throw new IllegalArgumentException("Expense does not belong to specified trip");
        }

        if (dto.getAmount() != null) {
            if (dto.getAmount() < 0) throw new IllegalArgumentException("Amount cannot be negative");
            expense.setAmount(dto.getAmount());
        }
        if (dto.getCategory() != null) expense.setCategory(dto.getCategory());
        if (dto.getDescription() != null) expense.setDescription(dto.getDescription());
        if (dto.getExpenseDate() != null) expense.setExpenseDate(dto.getExpenseDate());
        if (dto.getPaidBy() != null) expense.setPaidBy(dto.getPaidBy());

        Expense updated = expenseRepository.save(expense);
        updateTripBudgetTotals(tripId);

        return mapToDto(updated);
    }

    @Transactional
    public void deleteExpense(Long tripId, Long expenseId) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateAccess(trip, currentUser);

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getTripId().equals(tripId)) {
            throw new IllegalArgumentException("Expense does not belong to specified trip");
        }

        expenseRepository.delete(expense);
        updateTripBudgetTotals(tripId);
    }

    public ExpenseSummaryDto getExpenseSummary(Long tripId) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateAccess(trip, currentUser);

        List<Expense> expenses = expenseRepository.findByTripId(tripId);
        Double totalBudget = trip.getBudget() != null ? trip.getBudget() : 0.0;
        Double totalExpenses = expenses.stream().mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0).sum();
        Double remainingBudget = totalBudget - totalExpenses;
        Double utilization = totalBudget > 0 ? (totalExpenses / totalBudget) * 100.0 : 0.0;

        Double highestExpense = expenses.stream()
                .mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0)
                .max().orElse(0.0);

        Map<ExpenseCategory, Double> categoryWiseExpenses = new EnumMap<>(ExpenseCategory.class);
        for (ExpenseCategory cat : ExpenseCategory.values()) {
            categoryWiseExpenses.put(cat, 0.0);
        }

        for (Expense e : expenses) {
            ExpenseCategory cat = e.getCategory() != null ? e.getCategory() : ExpenseCategory.MISCELLANEOUS;
            categoryWiseExpenses.put(cat, categoryWiseExpenses.getOrDefault(cat, 0.0) + e.getAmount());
        }

        List<ExpenseDto> dtoList = expenses.stream().map(this::mapToDto).collect(Collectors.toList());

        return ExpenseSummaryDto.builder()
                .tripId(tripId)
                .totalBudget(totalBudget)
                .totalExpenses(totalExpenses)
                .remainingBudget(remainingBudget)
                .budgetUtilization(utilization)
                .highestExpense(highestExpense)
                .numberOfExpenses(expenses.size())
                .categoryWiseExpenses(categoryWiseExpenses)
                .expenses(dtoList)
                .build();
    }

    private void updateTripBudgetTotals(Long tripId) {
        Double totalExpenses = expenseRepository.findByTripId(tripId)
                .stream().mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0).sum();

        Optional<Budget> budgetOpt = budgetRepository.findByTripId(tripId);
        if (budgetOpt.isPresent()) {
            Budget b = budgetOpt.get();
            b.setTotalExpenses(totalExpenses);
            budgetRepository.save(b);
        }
    }

    private ExpenseDto mapToDto(Expense e) {
        return ExpenseDto.builder()
                .id(e.getId())
                .tripId(e.getTripId())
                .amount(e.getAmount())
                .category(e.getCategory())
                .description(e.getDescription())
                .expenseDate(e.getExpenseDate())
                .paidBy(e.getPaidBy())
                .createdAt(e.getCreatedAt())
                .build();
    }
}
