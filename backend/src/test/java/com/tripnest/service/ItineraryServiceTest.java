package com.tripnest.service;

import com.tripnest.dto.ItineraryDto;
import com.tripnest.entity.Itinerary;
import com.tripnest.repository.ItineraryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ItineraryServiceTest {

    @Mock
    private ItineraryRepository itineraryRepository;

    @InjectMocks
    private ItineraryService itineraryService;

    private Itinerary testItinerary;

    @BeforeEach
    void setUp() {
        testItinerary = Itinerary.builder()
                .id(1L)
                .tripId(10L)
                .dayNumber(1)
                .date(LocalDate.now())
                .title("Day 1 - Arrival")
                .notes("Check into hotel")
                .build();
    }

    @Test
    void testGetItinerariesByTripId_Success() {
        when(itineraryRepository.findByTripIdOrderByDayNumberAsc(10L)).thenReturn(List.of(testItinerary));

        List<ItineraryDto> result = itineraryService.getItinerariesByTripId(10L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Day 1 - Arrival", result.get(0).getTitle());
    }

    @Test
    void testCreateOrUpdateItinerary_Success() {
        ItineraryDto dto = new ItineraryDto(null, 10L, 1, LocalDate.now(), "Day 1 - Arrival", "Notes");
        when(itineraryRepository.save(any())).thenReturn(testItinerary);

        ItineraryDto created = itineraryService.createOrUpdateItinerary(dto);

        assertNotNull(created);
        assertEquals("Day 1 - Arrival", created.getTitle());
        verify(itineraryRepository, times(1)).save(any());
    }
}
