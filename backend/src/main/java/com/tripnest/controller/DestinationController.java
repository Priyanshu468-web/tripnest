package com.tripnest.controller;

import com.tripnest.entity.Destination;
import com.tripnest.service.DestinationService;
<<<<<<< HEAD
import com.tripnest.service.WeatherService;
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
<<<<<<< HEAD
import java.util.Map;
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DestinationController {

    private final DestinationService destinationService;
<<<<<<< HEAD
    private final WeatherService weatherService;

    @Autowired
    public DestinationController(DestinationService destinationService, WeatherService weatherService) {
        this.destinationService = destinationService;
        this.weatherService = weatherService;
=======

    @Autowired
    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    }

    @GetMapping
    public ResponseEntity<List<Destination>> getAllDestinations() {
        return ResponseEntity.ok(destinationService.getAllDestinations());
    }

<<<<<<< HEAD
    @GetMapping("/popular")
    public ResponseEntity<List<Destination>> getPopularDestinations() {
        return ResponseEntity.ok(destinationService.getAllDestinations());
    }

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        return ResponseEntity.ok(destinationService.getDestinationById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Destination>> searchDestinations(@RequestParam(required = false) String query) {
        return ResponseEntity.ok(destinationService.searchDestinations(query));
    }
<<<<<<< HEAD

    @GetMapping("/{destinationName}/weather")
    public ResponseEntity<Map<String, Object>> getDestinationWeather(@PathVariable String destinationName) {
        return ResponseEntity.ok(weatherService.getWeatherForDestination(destinationName));
    }
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
}
