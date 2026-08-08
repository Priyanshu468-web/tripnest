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

    @Column(length = 1000)
    private String notes;

    private LocalDateTime updatedAt;

    public Budget() {}

    public Budget(Long id, Long tripId, Double totalBudget, Double totalExpenses, Double remainingBudget, Double budgetUtilization, String notes, LocalDateTime updatedAt) {
        this.id = id;
        this.tripId = tripId;
        this.totalBudget = totalBudget;
        this.totalExpenses = totalExpenses;
        this.remainingBudget = remainingBudget;
        this.budgetUtilization = budgetUtilization;
        this.notes = notes;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    @PreUpdate
    protected void onSave() {
        updatedAt = LocalDateTime.now();
        if (totalBudget == null) totalBudget = 0.0;
        if (totalExpenses == null) totalExpenses = 0.0;

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
        private String notes;
        private LocalDateTime updatedAt;

        public BudgetBuilder id(Long id) { this.id = id; return this; }
        public BudgetBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public BudgetBuilder totalBudget(Double totalBudget) { this.totalBudget = totalBudget; return this; }
        public BudgetBuilder totalExpenses(Double totalExpenses) { this.totalExpenses = totalExpenses; return this; }
        public BudgetBuilder remainingBudget(Double remainingBudget) { this.remainingBudget = remainingBudget; return this; }
        public BudgetBuilder budgetUtilization(Double budgetUtilization) { this.budgetUtilization = budgetUtilization; return this; }
        public BudgetBuilder notes(String notes) { this.notes = notes; return this; }
        public BudgetBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Budget build() {
            return new Budget(id, tripId, totalBudget, totalExpenses, remainingBudget, budgetUtilization, notes, updatedAt);
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

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
