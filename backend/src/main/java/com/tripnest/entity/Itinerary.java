package com.tripnest.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "itineraries")
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long tripId;

    @Column(nullable = false)
    private Integer dayNumber;

    private LocalDate date;

    private String title;

    @Column(length = 1000)
    private String notes;

    private LocalDateTime createdAt;

    public Itinerary() {}

    public Itinerary(Long id, Long tripId, Integer dayNumber, LocalDate date, String title, String notes, LocalDateTime createdAt) {
        this.id = id;
        this.tripId = tripId;
        this.dayNumber = dayNumber;
        this.date = date;
        this.title = title;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (title == null) {
            title = "Day " + (dayNumber != null ? dayNumber : 1);
        }
    }

    public static ItineraryBuilder builder() { return new ItineraryBuilder(); }

    public static class ItineraryBuilder {
        private Long id;
        private Long tripId;
        private Integer dayNumber;
        private LocalDate date;
        private String title;
        private String notes;
        private LocalDateTime createdAt;

        public ItineraryBuilder id(Long id) { this.id = id; return this; }
        public ItineraryBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public ItineraryBuilder dayNumber(Integer dayNumber) { this.dayNumber = dayNumber; return this; }
        public ItineraryBuilder date(LocalDate date) { this.date = date; return this; }
        public ItineraryBuilder title(String title) { this.title = title; return this; }
        public ItineraryBuilder notes(String notes) { this.notes = notes; return this; }
        public ItineraryBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Itinerary build() {
            return new Itinerary(id, tripId, dayNumber, date, title, notes, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public Integer getDayNumber() { return dayNumber; }
    public void setDayNumber(Integer dayNumber) { this.dayNumber = dayNumber; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
