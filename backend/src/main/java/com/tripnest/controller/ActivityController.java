package com.tripnest.controller;

import com.tripnest.dto.ActivityDto;
import com.tripnest.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping("/api/trips/{tripId}/activities")
    public ResponseEntity<ActivityDto> addActivity(@PathVariable Long tripId, @Valid @RequestBody ActivityDto dto) {
        return ResponseEntity.ok(activityService.addActivity(tripId, dto));
    }

    @GetMapping("/api/trips/{tripId}/activities")
    public ResponseEntity<List<ActivityDto>> getActivitiesByTrip(@PathVariable Long tripId) {
        return ResponseEntity.ok(activityService.getActivitiesByTrip(tripId));
    }

    @PutMapping("/api/activities/{id}")
    public ResponseEntity<ActivityDto> updateActivity(@PathVariable Long id, @RequestBody ActivityDto dto) {
        return ResponseEntity.ok(activityService.updateActivity(id, dto));
    }

    @DeleteMapping("/api/activities/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.ok().body("{\"message\": \"Activity deleted successfully\"}");
    }
}
