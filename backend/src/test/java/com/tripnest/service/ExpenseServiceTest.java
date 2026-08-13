package com.tripnest.service;

import com.tripnest.dto.ExpenseDto;
import com.tripnest.entity.Expense;
import com.tripnest.entity.Trip;
import com.tripnest.entity.User;
import com.tripnest.entity.enums.ExpenseCategory;
import com.tripnest.entity.enums.RoleName;
import com.tripnest.repository.ExpenseRepository;
import com.tripnest.repository.TripRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private TripRepository tripRepository;

    @Mock
    private TripService tripService;

    @Mock
    private AuthService authService;

    @InjectMocks
    private ExpenseService expenseService;

    private User testUser;
    private Trip testTrip;
    private Expense testExpense;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("alex@tripnest.com")
                .name("Alex")
                .role(RoleName.TRAVELER)
                .build();

        testTrip = Trip.builder()
                .id(10L)
                .budget(1000.0)
                .owner(testUser)
                .build();

        testExpense = Expense.builder()
                .id(1L)
                .tripId(10L)
                .title("Dinner")
                .amount(120.0)
                .category(ExpenseCategory.FOOD)
                .description("Italian restaurant")
                .expenseDate(LocalDate.now())
                .paidBy("Alex")
                .build();
    }

    @Test
    void testGetExpensesByTrip_Success() {
        when(authService.getCurrentUser()).thenReturn(testUser);
        when(tripRepository.findById(10L)).thenReturn(Optional.of(testTrip));
        when(expenseRepository.findByTripIdOrderByExpenseDateDesc(10L)).thenReturn(List.of(testExpense));

        List<ExpenseDto> list = expenseService.getExpensesByTrip(10L);

        assertNotNull(list);
        assertEquals(1, list.size());
        assertEquals(120.0, list.get(0).getAmount());
    }
}
