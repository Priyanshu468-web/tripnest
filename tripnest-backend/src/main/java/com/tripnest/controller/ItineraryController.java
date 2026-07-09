package com.tripnest.controller;

import com.tripnest.dto.request.CreateActivityRequest;
import com.tripnest.dto.response.ActivityDto;
import com.tripnest.dto.response.ItineraryDto;
import com.tripnest.security.SecurityUtil;
import com.tripnest.service.ItineraryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ItineraryController {

    private final ItineraryService itineraryService;

    public ItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    @GetMapping("/trips/{tripId}/itineraries")
    public ResponseEntity<List<ItineraryDto>> getItineraries(@PathVariable Long tripId) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(itineraryService.getOrCreateItineraries(tripId, email));
    }

    @PostMapping("/trips/{tripId}/itineraries/{day}/activities")
    public ResponseEntity<ActivityDto> addActivity(
            @PathVariable Long tripId,
            @PathVariable Integer day,
            @Valid @RequestBody CreateActivityRequest request) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(itineraryService.addActivity(tripId, day, request, email));
    }

    @PatchMapping("/activities/{id}")
    public ResponseEntity<ActivityDto> updateActivity(
            @PathVariable Long id,
            @RequestBody CreateActivityRequest request) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(itineraryService.updateActivity(id, request, email));
    }

    @DeleteMapping("/activities/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        itineraryService.deleteActivity(id, email);
        return ResponseEntity.noContent().build();
    }
}
