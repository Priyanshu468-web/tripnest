package com.tripnest.dto;

import java.time.LocalDate;

public class ItineraryDto {
    private Long id;
    private Long tripId;
    private Integer dayNumber;
    private LocalDate date;
    private String title;
    private String notes;

    public ItineraryDto() {}

    public ItineraryDto(Long id, Long tripId, Integer dayNumber, LocalDate date, String title, String notes) {
        this.id = id;
        this.tripId = tripId;
        this.dayNumber = dayNumber;
        this.date = date;
        this.title = title;
        this.notes = notes;
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
}
