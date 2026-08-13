package com.tripnest.service;

import com.tripnest.dto.ActivityDto;
import com.tripnest.entity.Activity;
import com.tripnest.entity.Trip;
import com.tripnest.entity.User;
import com.tripnest.repository.ActivityRepository;
import com.tripnest.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final TripRepository tripRepository;
    private final TripService tripService;
    private final AuthService authService;

    @Autowired
    public ActivityService(ActivityRepository activityRepository, TripRepository tripRepository, TripService tripService, AuthService authService) {
        this.activityRepository = activityRepository;
        this.tripRepository = tripRepository;
        this.tripService = tripService;
        this.authService = authService;
    }

    @Transactional
    public ActivityDto addActivity(Long tripId, ActivityDto dto) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateModifyPermission(trip, currentUser);

        Activity activity = Activity.builder()
                .tripId(tripId)
                .dayNumber(dto.getDayNumber() != null ? dto.getDayNumber() : 1)
                .activityDate(dto.getActivityDate() != null ? dto.getActivityDate() : trip.getStartDate())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .location(dto.getLocation())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .activityType(dto.getActivityType())
                .notes(dto.getNotes())
                .build();

        Activity saved = activityRepository.save(activity);
        return mapToDto(saved);
    }

    public List<ActivityDto> getActivitiesByTrip(Long tripId) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateAccess(trip, currentUser);

        return activityRepository.findByTripIdOrderByDayNumberAscStartTimeAsc(tripId)
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public ActivityDto updateActivity(Long activityId, ActivityDto dto) {
        User currentUser = authService.getCurrentUser();
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        Trip trip = tripRepository.findById(activity.getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateModifyPermission(trip, currentUser);

        if (dto.getTitle() != null) activity.setTitle(dto.getTitle());
        if (dto.getDescription() != null) activity.setDescription(dto.getDescription());
        if (dto.getLocation() != null) activity.setLocation(dto.getLocation());
        if (dto.getStartTime() != null) activity.setStartTime(dto.getStartTime());
        if (dto.getEndTime() != null) activity.setEndTime(dto.getEndTime());
        if (dto.getActivityType() != null) activity.setActivityType(dto.getActivityType());
        if (dto.getDayNumber() != null) activity.setDayNumber(dto.getDayNumber());
        if (dto.getActivityDate() != null) activity.setActivityDate(dto.getActivityDate());
        if (dto.getNotes() != null) activity.setNotes(dto.getNotes());

        Activity updated = activityRepository.save(activity);
        return mapToDto(updated);
    }

    @Transactional
    public void deleteActivity(Long activityId) {
        User currentUser = authService.getCurrentUser();
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        Trip trip = tripRepository.findById(activity.getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateModifyPermission(trip, currentUser);

        activityRepository.delete(activity);
    }

    private ActivityDto mapToDto(Activity activity) {
        return ActivityDto.builder()
                .id(activity.getId())
                .tripId(activity.getTripId())
                .dayNumber(activity.getDayNumber())
                .activityDate(activity.getActivityDate())
                .title(activity.getTitle())
                .description(activity.getDescription())
                .location(activity.getLocation())
                .startTime(activity.getStartTime())
                .endTime(activity.getEndTime())
                .activityType(activity.getActivityType())
                .notes(activity.getNotes())
                .build();
    }
}
