package com.tripnest.service;

import com.tripnest.dto.BudgetDto;
import com.tripnest.entity.Budget;
import com.tripnest.entity.Trip;
import com.tripnest.repository.BudgetRepository;
import com.tripnest.repository.ExpenseRepository;
import com.tripnest.repository.TripRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BudgetServiceTest {

    @Mock
    private BudgetRepository budgetRepository;

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private TripRepository tripRepository;

    @InjectMocks
    private BudgetService budgetService;

    private Budget testBudget;

    @BeforeEach
    void setUp() {
        testBudget = Budget.builder()
                .id(1L)
                .tripId(10L)
                .totalBudget(2000.0)
                .totalExpenses(500.0)
                .remainingBudget(1500.0)
                .budgetUtilization(25.0)
                .build();
    }

    @Test
    void testCalculateAndMapDto_Success() {
        when(expenseRepository.findByTripId(10L)).thenReturn(Collections.emptyList());

        BudgetDto dto = budgetService.calculateAndMapDto(testBudget);

        assertNotNull(dto);
        assertEquals(2000.0, dto.getTotalBudget());
        assertEquals(0.0, dto.getTotalExpenses());
        assertEquals(2000.0, dto.getRemainingBudget());
    }
}
