package com.tripnest.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long tripId;

    @Column(nullable = false)
    private Double totalBudget;

    private Double totalExpenses;
    private Double remainingBudget;
    private Double budgetUtilization;

<<<<<<< HEAD
    private Double transportationBudget;
    private Double hotelBudget;
    private Double foodBudget;
    private Double shoppingBudget;
    private Double entertainmentBudget;
    private Double miscBudget;

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    @Column(length = 1000)
    private String notes;

    private LocalDateTime updatedAt;

    public Budget() {}

<<<<<<< HEAD
    public Budget(Long id, Long tripId, Double totalBudget, Double totalExpenses, Double remainingBudget, Double budgetUtilization, Double transportationBudget, Double hotelBudget, Double foodBudget, Double shoppingBudget, Double entertainmentBudget, Double miscBudget, String notes, LocalDateTime updatedAt) {
=======
    public Budget(Long id, Long tripId, Double totalBudget, Double totalExpenses, Double remainingBudget, Double budgetUtilization, String notes, LocalDateTime updatedAt) {
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        this.id = id;
        this.tripId = tripId;
        this.totalBudget = totalBudget;
        this.totalExpenses = totalExpenses;
        this.remainingBudget = remainingBudget;
        this.budgetUtilization = budgetUtilization;
<<<<<<< HEAD
        this.transportationBudget = transportationBudget;
        this.hotelBudget = hotelBudget;
        this.foodBudget = foodBudget;
        this.shoppingBudget = shoppingBudget;
        this.entertainmentBudget = entertainmentBudget;
        this.miscBudget = miscBudget;
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        this.notes = notes;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    @PreUpdate
    protected void onSave() {
        updatedAt = LocalDateTime.now();
        if (totalBudget == null) totalBudget = 0.0;
        if (totalExpenses == null) totalExpenses = 0.0;
<<<<<<< HEAD
        if (transportationBudget == null) transportationBudget = 0.0;
        if (hotelBudget == null) hotelBudget = 0.0;
        if (foodBudget == null) foodBudget = 0.0;
        if (shoppingBudget == null) shoppingBudget = 0.0;
        if (entertainmentBudget == null) entertainmentBudget = 0.0;
        if (miscBudget == null) miscBudget = 0.0;
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e

        remainingBudget = totalBudget - totalExpenses;
        if (totalBudget > 0) {
            budgetUtilization = (totalExpenses / totalBudget) * 100.0;
        } else {
            budgetUtilization = 0.0;
        }
    }

    public static BudgetBuilder builder() { return new BudgetBuilder(); }

    public static class BudgetBuilder {
        private Long id;
        private Long tripId;
        private Double totalBudget;
        private Double totalExpenses;
        private Double remainingBudget;
        private Double budgetUtilization;
<<<<<<< HEAD
        private Double transportationBudget;
        private Double hotelBudget;
        private Double foodBudget;
        private Double shoppingBudget;
        private Double entertainmentBudget;
        private Double miscBudget;
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        private String notes;
        private LocalDateTime updatedAt;

        public BudgetBuilder id(Long id) { this.id = id; return this; }
        public BudgetBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public BudgetBuilder totalBudget(Double totalBudget) { this.totalBudget = totalBudget; return this; }
        public BudgetBuilder totalExpenses(Double totalExpenses) { this.totalExpenses = totalExpenses; return this; }
        public BudgetBuilder remainingBudget(Double remainingBudget) { this.remainingBudget = remainingBudget; return this; }
        public BudgetBuilder budgetUtilization(Double budgetUtilization) { this.budgetUtilization = budgetUtilization; return this; }
<<<<<<< HEAD
        public BudgetBuilder transportationBudget(Double transportationBudget) { this.transportationBudget = transportationBudget; return this; }
        public BudgetBuilder hotelBudget(Double hotelBudget) { this.hotelBudget = hotelBudget; return this; }
        public BudgetBuilder foodBudget(Double foodBudget) { this.foodBudget = foodBudget; return this; }
        public BudgetBuilder shoppingBudget(Double shoppingBudget) { this.shoppingBudget = shoppingBudget; return this; }
        public BudgetBuilder entertainmentBudget(Double entertainmentBudget) { this.entertainmentBudget = entertainmentBudget; return this; }
        public BudgetBuilder miscBudget(Double miscBudget) { this.miscBudget = miscBudget; return this; }
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        public BudgetBuilder notes(String notes) { this.notes = notes; return this; }
        public BudgetBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Budget build() {
<<<<<<< HEAD
            return new Budget(id, tripId, totalBudget, totalExpenses, remainingBudget, budgetUtilization, transportationBudget, hotelBudget, foodBudget, shoppingBudget, entertainmentBudget, miscBudget, notes, updatedAt);
=======
            return new Budget(id, tripId, totalBudget, totalExpenses, remainingBudget, budgetUtilization, notes, updatedAt);
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public Double getTotalBudget() { return totalBudget; }
    public void setTotalBudget(Double totalBudget) { this.totalBudget = totalBudget; }

    public Double getTotalExpenses() { return totalExpenses; }
    public void setTotalExpenses(Double totalExpenses) { this.totalExpenses = totalExpenses; }

    public Double getRemainingBudget() { return remainingBudget; }
    public void setRemainingBudget(Double remainingBudget) { this.remainingBudget = remainingBudget; }

    public Double getBudgetUtilization() { return budgetUtilization; }
    public void setBudgetUtilization(Double budgetUtilization) { this.budgetUtilization = budgetUtilization; }

<<<<<<< HEAD
    public Double getTransportationBudget() { return transportationBudget; }
    public void setTransportationBudget(Double transportationBudget) { this.transportationBudget = transportationBudget; }

    public Double getHotelBudget() { return hotelBudget; }
    public void setHotelBudget(Double hotelBudget) { this.hotelBudget = hotelBudget; }

    public Double getFoodBudget() { return foodBudget; }
    public void setFoodBudget(Double foodBudget) { this.foodBudget = foodBudget; }

    public Double getShoppingBudget() { return shoppingBudget; }
    public void setShoppingBudget(Double shoppingBudget) { this.shoppingBudget = shoppingBudget; }

    public Double getEntertainmentBudget() { return entertainmentBudget; }
    public void setEntertainmentBudget(Double entertainmentBudget) { this.entertainmentBudget = entertainmentBudget; }

    public Double getMiscBudget() { return miscBudget; }
    public void setMiscBudget(Double miscBudget) { this.miscBudget = miscBudget; }

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
