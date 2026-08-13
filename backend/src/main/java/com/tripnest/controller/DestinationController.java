package com.tripnest.controller;

import com.tripnest.entity.Destination;
import com.tripnest.service.DestinationService;
import com.tripnest.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DestinationController {

    private final DestinationService destinationService;
    private final WeatherService weatherService;

    @Autowired
    public DestinationController(DestinationService destinationService, WeatherService weatherService) {
        this.destinationService = destinationService;
        this.weatherService = weatherService;
    }

    @GetMapping
    public ResponseEntity<List<Destination>> getAllDestinations() {
        return ResponseEntity.ok(destinationService.getAllDestinations());
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Destination>> getPopularDestinations() {
        return ResponseEntity.ok(destinationService.getAllDestinations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        return ResponseEntity.ok(destinationService.getDestinationById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Destination>> searchDestinations(@RequestParam(required = false) String query) {
        return ResponseEntity.ok(destinationService.searchDestinations(query));
    }

    @GetMapping("/{destinationName}/weather")
    public ResponseEntity<Map<String, Object>> getDestinationWeather(@PathVariable String destinationName) {
        return ResponseEntity.ok(weatherService.getWeatherForDestination(destinationName));
    }
}
