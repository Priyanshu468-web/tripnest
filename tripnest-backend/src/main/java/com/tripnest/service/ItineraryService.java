package com.tripnest.service;

import com.tripnest.dto.request.CreateActivityRequest;
import com.tripnest.dto.response.ActivityDto;
import com.tripnest.dto.response.ItineraryDto;
import com.tripnest.entity.Activity;
import com.tripnest.entity.Itinerary;
import com.tripnest.entity.Trip;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.exception.UnauthorizedException;
import com.tripnest.repository.ActivityRepository;
import com.tripnest.repository.ItineraryRepository;
import com.tripnest.repository.TripMemberRepository;
import com.tripnest.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;
    private final ActivityRepository activityRepository;
    private final TripRepository tripRepository;
    private final TripMemberRepository tripMemberRepository;

    public ItineraryService(ItineraryRepository itineraryRepository, ActivityRepository activityRepository,
                            TripRepository tripRepository, TripMemberRepository tripMemberRepository) {
        this.itineraryRepository = itineraryRepository;
        this.activityRepository = activityRepository;
        this.tripRepository = tripRepository;
        this.tripMemberRepository = tripMemberRepository;
    }

    @Transactional
    public List<ItineraryDto> getOrCreateItineraries(Long tripId, String email) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(tripId, email);
        if (!isMember && !trip.getIsPublic()) {
            throw new UnauthorizedException("Not authorized to view this trip's itineraries");
        }

        List<Itinerary> itineraries = itineraryRepository.findByTripIdOrderByDayAsc(tripId);

        // If no itineraries generated, generate one for each day of the trip
        long daysCount = ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
        if (itineraries.isEmpty() && daysCount > 0) {
            itineraries = new ArrayList<>();
            for (int i = 1; i <= daysCount; i++) {
                LocalDate date = trip.getStartDate().plusDays(i - 1);
                Itinerary itinerary = Itinerary.builder()
                        .trip(trip)
                        .day(i)
                        .date(date)
                        .title("Day " + i)
                        .build();
                itineraries.add(itineraryRepository.save(itinerary));
            }
        }

        return itineraries.stream()
                .map(this::mapToItineraryDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ActivityDto addActivity(Long tripId, Integer day, CreateActivityRequest request, String email) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(tripId, email);
        if (!isMember) {
            throw new UnauthorizedException("Not authorized to modify this trip's itineraries");
        }

        Itinerary itinerary = itineraryRepository.findByTripIdAndDay(tripId, day)
                .orElseGet(() -> {
                    LocalDate date = trip.getStartDate().plusDays(day - 1);
                    return itineraryRepository.save(Itinerary.builder()
                            .trip(trip)
                            .day(day)
                            .date(date)
                            .title("Day " + day)
                            .build());
                });

        Activity activity = Activity.builder()
                .itinerary(itinerary)
                .name(request.getName())
                .category(request.getCategory())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .location(request.getLocation())
                .notes(request.getNotes())
                .cost(request.getCost() != null ? request.getCost() : BigDecimal.ZERO)
                .order(request.getOrder() != null ? request.getOrder() : 0)
                .build();

        Activity savedActivity = activityRepository.save(activity);
        return mapToActivityDto(savedActivity);
    }

    @Transactional
    public ActivityDto updateActivity(Long activityId, CreateActivityRequest request, String email) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found"));

        Trip trip = activity.getItinerary().getTrip();
        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(trip.getId(), email);
        if (!isMember) {
            throw new UnauthorizedException("Not authorized to modify this trip");
        }

        if (request.getName() != null) {
            activity.setName(request.getName());
        }
        if (request.getCategory() != null) {
            activity.setCategory(request.getCategory());
        }
        if (request.getStartTime() != null) {
            activity.setStartTime(request.getStartTime());
        }
        if (request.getEndTime() != null) {
            activity.setEndTime(request.getEndTime());
        }
        if (request.getLocation() != null) {
            activity.setLocation(request.getLocation());
        }
        if (request.getNotes() != null) {
            activity.setNotes(request.getNotes());
        }
        if (request.getCost() != null) {
            activity.setCost(request.getCost());
        }
        if (request.getOrder() != null) {
            activity.setOrder(request.getOrder());
        }

        Activity updatedActivity = activityRepository.save(activity);
        return mapToActivityDto(updatedActivity);
    }

    @Transactional
    public void deleteActivity(Long activityId, String email) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found"));

        Trip trip = activity.getItinerary().getTrip();
        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(trip.getId(), email);
        if (!isMember) {
            throw new UnauthorizedException("Not authorized to delete activity");
        }

        activityRepository.delete(activity);
    }

    public ItineraryDto mapToItineraryDto(Itinerary itinerary) {
        List<ActivityDto> activityDtos = new ArrayList<>();
        if (itinerary.getActivities() != null) {
            activityDtos = itinerary.getActivities().stream()
                    .map(this::mapToActivityDto)
                    .collect(Collectors.toList());
        }

        return ItineraryDto.builder()
                .id(itinerary.getId())
                .tripId(itinerary.getTrip().getId())
                .day(itinerary.getDay())
                .date(itinerary.getDate())
                .title(itinerary.getTitle())
                .activities(activityDtos)
                .build();
    }

    public ActivityDto mapToActivityDto(Activity activity) {
        return ActivityDto.builder()
                .id(activity.getId())
                .itineraryId(activity.getItinerary().getId())
                .name(activity.getName())
                .category(activity.getCategory())
                .startTime(activity.getStartTime())
                .endTime(activity.getEndTime())
                .location(activity.getLocation())
                .notes(activity.getNotes())
                .cost(activity.getCost())
                .order(activity.getOrder())
                .build();
    }
}
