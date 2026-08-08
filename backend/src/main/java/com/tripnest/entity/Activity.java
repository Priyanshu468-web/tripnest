package com.tripnest.entity;

import com.tripnest.entity.enums.ActivityType;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long tripId;

    private Integer dayNumber;
    private LocalDate activityDate;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private String location;

    private String startTime;
    private String endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType activityType;

    @Column(length = 1000)
    private String notes;

    private LocalDateTime createdAt;

    public Activity() {}

    public Activity(Long id, Long tripId, Integer dayNumber, LocalDate activityDate, String title, String description, String location, String startTime, String endTime, ActivityType activityType, String notes, LocalDateTime createdAt) {
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
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (activityType == null) activityType = ActivityType.SIGHTSEEING;
    }

    public static ActivityBuilder builder() { return new ActivityBuilder(); }

    public static class ActivityBuilder {
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
        private LocalDateTime createdAt;

        public ActivityBuilder id(Long id) { this.id = id; return this; }
        public ActivityBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public ActivityBuilder dayNumber(Integer dayNumber) { this.dayNumber = dayNumber; return this; }
        public ActivityBuilder activityDate(LocalDate activityDate) { this.activityDate = activityDate; return this; }
        public ActivityBuilder title(String title) { this.title = title; return this; }
        public ActivityBuilder description(String description) { this.description = description; return this; }
        public ActivityBuilder location(String location) { this.location = location; return this; }
        public ActivityBuilder startTime(String startTime) { this.startTime = startTime; return this; }
        public ActivityBuilder endTime(String endTime) { this.endTime = endTime; return this; }
        public ActivityBuilder activityType(ActivityType activityType) { this.activityType = activityType; return this; }
        public ActivityBuilder notes(String notes) { this.notes = notes; return this; }
        public ActivityBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Activity build() {
            return new Activity(id, tripId, dayNumber, activityDate, title, description, location, startTime, endTime, activityType, notes, createdAt);
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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
