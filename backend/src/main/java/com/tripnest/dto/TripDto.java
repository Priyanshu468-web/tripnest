package com.tripnest.dto;

import com.tripnest.entity.enums.TripStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TripDto {
    private Long id;
    private String title;

    @NotBlank
    private String destination;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotNull
    @Min(1)
    private Integer travelers;

    @NotNull
    @Min(0)
    private Double budget;

    private String description;

    private TripStatus status;

    private Long ownerId;
    private String ownerName;
    private String ownerEmail;

    private Double totalSpent;
    private Double remainingBudget;
    private Double budgetUtilization;

    private LocalDateTime createdAt;

    public TripDto() {}

    public TripDto(Long id, String title, String destination, LocalDate startDate, LocalDate endDate, Integer travelers, Double budget, String description, TripStatus status, Long ownerId, String ownerName, String ownerEmail, Double totalSpent, Double remainingBudget, Double budgetUtilization, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.travelers = travelers;
        this.budget = budget;
        this.description = description;
        this.status = status;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.ownerEmail = ownerEmail;
        this.totalSpent = totalSpent;
        this.remainingBudget = remainingBudget;
        this.budgetUtilization = budgetUtilization;
        this.createdAt = createdAt;
    }

    public static TripDtoBuilder builder() { return new TripDtoBuilder(); }

    public static class TripDtoBuilder {
        private Long id;
        private String title;
        private String destination;
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer travelers;
        private Double budget;
        private String description;
        private TripStatus status;
        private Long ownerId;
        private String ownerName;
        private String ownerEmail;
        private Double totalSpent;
        private Double remainingBudget;
        private Double budgetUtilization;
        private LocalDateTime createdAt;

        public TripDtoBuilder id(Long id) { this.id = id; return this; }
        public TripDtoBuilder title(String title) { this.title = title; return this; }
        public TripDtoBuilder destination(String destination) { this.destination = destination; return this; }
        public TripDtoBuilder startDate(LocalDate startDate) { this.startDate = startDate; return this; }
        public TripDtoBuilder endDate(LocalDate endDate) { this.endDate = endDate; return this; }
        public TripDtoBuilder travelers(Integer travelers) { this.travelers = travelers; return this; }
        public TripDtoBuilder budget(Double budget) { this.budget = budget; return this; }
        public TripDtoBuilder description(String description) { this.description = description; return this; }
        public TripDtoBuilder status(TripStatus status) { this.status = status; return this; }
        public TripDtoBuilder ownerId(Long ownerId) { this.ownerId = ownerId; return this; }
        public TripDtoBuilder ownerName(String ownerName) { this.ownerName = ownerName; return this; }
        public TripDtoBuilder ownerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; return this; }
        public TripDtoBuilder totalSpent(Double totalSpent) { this.totalSpent = totalSpent; return this; }
        public TripDtoBuilder remainingBudget(Double remainingBudget) { this.remainingBudget = remainingBudget; return this; }
        public TripDtoBuilder budgetUtilization(Double budgetUtilization) { this.budgetUtilization = budgetUtilization; return this; }
        public TripDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public TripDto build() {
            return new TripDto(id, title, destination, startDate, endDate, travelers, budget, description, status, ownerId, ownerName, ownerEmail, totalSpent, remainingBudget, budgetUtilization, createdAt);
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

    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }

    public Double getTotalSpent() { return totalSpent; }
    public void setTotalSpent(Double totalSpent) { this.totalSpent = totalSpent; }

    public Double getRemainingBudget() { return remainingBudget; }
    public void setRemainingBudget(Double remainingBudget) { this.remainingBudget = remainingBudget; }

    public Double getBudgetUtilization() { return budgetUtilization; }
    public void setBudgetUtilization(Double budgetUtilization) { this.budgetUtilization = budgetUtilization; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
