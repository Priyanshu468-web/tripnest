package com.tripnest.controller;

import com.tripnest.dto.ItineraryDto;
import com.tripnest.service.ItineraryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/itineraries")
@CrossOrigin(origins = "*")
public class ItineraryController {

    private final ItineraryService itineraryService;

    @Autowired
    public ItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<ItineraryDto>> getItinerariesByTripId(@PathVariable Long tripId) {
        return ResponseEntity.ok(itineraryService.getItinerariesByTripId(tripId));
    }

    @PostMapping
    public ResponseEntity<ItineraryDto> createOrUpdateItinerary(@Valid @RequestBody ItineraryDto itineraryDto) {
        return ResponseEntity.ok(itineraryService.createOrUpdateItinerary(itineraryDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteItinerary(@PathVariable Long id) {
        itineraryService.deleteItinerary(id);
        return ResponseEntity.ok(Map.of("message", "Itinerary deleted successfully"));
    }
}
