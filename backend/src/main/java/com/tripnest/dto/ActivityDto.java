package com.tripnest.dto;

import com.tripnest.entity.enums.ActivityType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class ActivityDto {
    private Long id;
    private Long tripId;
    private Integer dayNumber;
    private LocalDate activityDate;

    @NotBlank
    private String title;

    private String description;
    private String location;
    private String startTime;
    private String endTime;

    @NotNull
    private ActivityType activityType;

    private String notes;

    public ActivityDto() {}

    public ActivityDto(Long id, Long tripId, Integer dayNumber, LocalDate activityDate, String title, String description, String location, String startTime, String endTime, ActivityType activityType, String notes) {
        this.id = id;
        this.tripId = tripId;
        this.dayNumber = dayNumber;
        this.activityDate = activityDate;
        this.title = title;
        this.description = description;
        this.location = location;
        this.startTime = startTime;
        this.endTime = endTime;
        this.activityType = activityType;
        this.notes = notes;
    }

    public static ActivityDtoBuilder builder() { return new ActivityDtoBuilder(); }

    public static class ActivityDtoBuilder {
        private Long id;
        private Long tripId;
        private Integer dayNumber;
        private LocalDate activityDate;
        private String title;
        private String description;
        private String location;
        private String startTime;
        private String endTime;
        private ActivityType activityType;
        private String notes;

        public ActivityDtoBuilder id(Long id) { this.id = id; return this; }
        public ActivityDtoBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public ActivityDtoBuilder dayNumber(Integer dayNumber) { this.dayNumber = dayNumber; return this; }
        public ActivityDtoBuilder activityDate(LocalDate activityDate) { this.activityDate = activityDate; return this; }
        public ActivityDtoBuilder title(String title) { this.title = title; return this; }
        public ActivityDtoBuilder description(String description) { this.description = description; return this; }
        public ActivityDtoBuilder location(String location) { this.location = location; return this; }
        public ActivityDtoBuilder startTime(String startTime) { this.startTime = startTime; return this; }
        public ActivityDtoBuilder endTime(String endTime) { this.endTime = endTime; return this; }
        public ActivityDtoBuilder activityType(ActivityType activityType) { this.activityType = activityType; return this; }
        public ActivityDtoBuilder notes(String notes) { this.notes = notes; return this; }

        public ActivityDto build() {
            return new ActivityDto(id, tripId, dayNumber, activityDate, title, description, location, startTime, endTime, activityType, notes);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public Integer getDayNumber() { return dayNumber; }
    public void setDayNumber(Integer dayNumber) { this.dayNumber = dayNumber; }

    public LocalDate getActivityDate() { return activityDate; }
    public void setActivityDate(LocalDate activityDate) { this.activityDate = activityDate; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }

    public ActivityType getActivityType() { return activityType; }
    public void setActivityType(ActivityType activityType) { this.activityType = activityType; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
