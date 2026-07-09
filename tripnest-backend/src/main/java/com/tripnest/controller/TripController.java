package com.tripnest.controller;

import com.tripnest.dto.request.CreateTripRequest;
import com.tripnest.dto.response.TripDto;
import com.tripnest.dto.response.TripMemberDto;
import com.tripnest.security.SecurityUtil;
import com.tripnest.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping
    public ResponseEntity<TripDto> createTrip(@Valid @RequestBody CreateTripRequest request) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(tripService.createTrip(request, email));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getTrips() {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        List<TripDto> trips = tripService.getTripsForUser(email);
        Map<String, Object> response = new HashMap<>();
        response.put("trips", trips);
        response.put("total", trips.size());
        response.put("pages", 1); // pagination stub
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripDto> getTripById(@PathVariable Long id) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(tripService.getTripById(id, email));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TripDto> updateTrip(@PathVariable Long id, @RequestBody CreateTripRequest request) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(tripService.updateTrip(id, request, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTrip(@PathVariable Long id) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        tripService.deleteTrip(id, email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Trip deleted successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/members")
    public ResponseEntity<TripMemberDto> addMember(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        String collaboratorEmail = body.get("email");
        if (collaboratorEmail == null || collaboratorEmail.trim().isEmpty()) {
            throw new IllegalArgumentException("Collaborator email is required");
        }
        return ResponseEntity.ok(tripService.addMember(id, collaboratorEmail, email));
    }
}
