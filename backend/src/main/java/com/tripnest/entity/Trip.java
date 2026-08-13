package com.tripnest.entity;

import com.tripnest.entity.enums.TripStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Integer travelers;

    @Column(nullable = false)
    private Double budget;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TripStatus status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Trip() {}

    public Trip(Long id, String title, String destination, LocalDate startDate, LocalDate endDate, Integer travelers, Double budget, String description, TripStatus status, User owner, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.travelers = travelers;
        this.budget = budget;
        this.description = description;
        this.status = status;
        this.owner = owner;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = TripStatus.PLANNING;
        if (travelers == null) travelers = 1;
        if (budget == null) budget = 0.0;
        if (title == null || title.trim().isEmpty()) {
            title = "Trip to " + destination;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public static TripBuilder builder() { return new TripBuilder(); }

    public static class TripBuilder {
        private Long id;
        private String title;
        private String destination;
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer travelers;
        private Double budget;
        private String description;
        private TripStatus status;
        private User owner;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public TripBuilder id(Long id) { this.id = id; return this; }
        public TripBuilder title(String title) { this.title = title; return this; }
        public TripBuilder destination(String destination) { this.destination = destination; return this; }
        public TripBuilder startDate(LocalDate startDate) { this.startDate = startDate; return this; }
        public TripBuilder endDate(LocalDate endDate) { this.endDate = endDate; return this; }
        public TripBuilder travelers(Integer travelers) { this.travelers = travelers; return this; }
        public TripBuilder budget(Double budget) { this.budget = budget; return this; }
        public TripBuilder description(String description) { this.description = description; return this; }
        public TripBuilder status(TripStatus status) { this.status = status; return this; }
        public TripBuilder owner(User owner) { this.owner = owner; return this; }
        public TripBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public TripBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Trip build() {
            return new Trip(id, title, destination, startDate, endDate, travelers, budget, description, status, owner, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Integer getTravelers() { return travelers; }
    public void setTravelers(Integer travelers) { this.travelers = travelers; }

    public Double getBudget() { return budget; }
    public void setBudget(Double budget) { this.budget = budget; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TripStatus getStatus() { return status; }
    public void setStatus(TripStatus status) { this.status = status; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
