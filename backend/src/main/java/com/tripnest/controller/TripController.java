package com.tripnest.controller;

import com.tripnest.dto.TripDto;
import com.tripnest.service.TripService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TripController {

    private final TripService tripService;

    @Autowired
    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping
    public ResponseEntity<TripDto> createTrip(@Valid @RequestBody TripDto tripDto) {
        return ResponseEntity.ok(tripService.createTrip(tripDto));
    }

    @GetMapping
    public ResponseEntity<List<TripDto>> getAllTrips() {
        return ResponseEntity.ok(tripService.getMyTrips());
    }

    @GetMapping("/my-trips")
    public ResponseEntity<List<TripDto>> getMyTrips() {
        return ResponseEntity.ok(tripService.getMyTrips());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripDto> getTripById(@PathVariable Long id) {
        return ResponseEntity.ok(tripService.getTripById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripDto> updateTrip(@PathVariable Long id, @RequestBody TripDto tripDto) {
        return ResponseEntity.ok(tripService.updateTrip(id, tripDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
        return ResponseEntity.ok().body("{\"message\": \"Trip deleted successfully\"}");
    }
}
