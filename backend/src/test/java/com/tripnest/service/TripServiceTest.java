package com.tripnest.service;

import com.tripnest.dto.TripDto;
import com.tripnest.entity.Budget;
import com.tripnest.entity.Trip;
import com.tripnest.entity.User;
import com.tripnest.entity.enums.RoleName;
import com.tripnest.entity.enums.TripStatus;
import com.tripnest.repository.BudgetRepository;
import com.tripnest.repository.ExpenseRepository;
import com.tripnest.repository.TripMemberRepository;
import com.tripnest.repository.TripRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TripServiceTest {

    @Mock
    private TripRepository tripRepository;

    @Mock
    private BudgetRepository budgetRepository;

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private TripMemberRepository tripMemberRepository;

    @Mock
    private AuthService authService;

    @InjectMocks
    private TripService tripService;

    private User testUser;
    private Trip testTrip;
    private TripDto tripDto;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("user@tripnest.com")
                .name("Alex")
                .role(RoleName.TRAVELER)
                .build();

        testTrip = Trip.builder()
                .id(10L)
                .title("Trip to Tokyo")
                .destination("Tokyo")
                .startDate(LocalDate.now().plusDays(10))
                .endDate(LocalDate.now().plusDays(15))
                .travelers(2)
                .budget(2500.0)
                .status(TripStatus.PLANNING)
                .owner(testUser)
                .build();

        tripDto = new TripDto();
        tripDto.setTitle("Trip to Tokyo");
        tripDto.setDestination("Tokyo");
        tripDto.setStartDate(LocalDate.now().plusDays(10));
        tripDto.setEndDate(LocalDate.now().plusDays(15));
        tripDto.setTravelers(2);
        tripDto.setBudget(2500.0);
    }

    @Test
    void testCreateTrip_Success() {
        when(authService.getCurrentUser()).thenReturn(testUser);
        when(tripRepository.save(any())).thenReturn(testTrip);
        when(budgetRepository.save(any())).thenReturn(Budget.builder().id(1L).tripId(10L).totalBudget(2500.0).build());

        TripDto created = tripService.createTrip(tripDto);

        assertNotNull(created);
        assertEquals("Tokyo", created.getDestination());
        assertEquals(2500.0, created.getBudget());
        verify(tripRepository, times(1)).save(any());
    }

    @Test
    void testGetTripById_Success() {
        when(authService.getCurrentUser()).thenReturn(testUser);
        when(tripRepository.findById(10L)).thenReturn(Optional.of(testTrip));
        when(expenseRepository.findByTripId(10L)).thenReturn(Collections.emptyList());

        TripDto found = tripService.getTripById(10L);

        assertNotNull(found);
        assertEquals(10L, found.getId());
        assertEquals("Tokyo", found.getDestination());
    }
}
