package com.tripnest.controller;

import com.tripnest.entity.Destination;
import com.tripnest.service.DestinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DestinationController {

    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping("/api/destinations")
    public ResponseEntity<List<Destination>> getDestinations(@RequestParam(required = false) String query) {
        return ResponseEntity.ok(destinationService.searchDestinations(query));
    }
}
