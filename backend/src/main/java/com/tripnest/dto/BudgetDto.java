package com.tripnest.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class BudgetDto {
    private Long id;
    private Long tripId;

    @NotNull
    @Min(0)
    private Double totalBudget;

    private Double totalExpenses;
    private Double remainingBudget;
    private Double budgetUtilization;
    private String notes;

    public BudgetDto() {}

    public BudgetDto(Long id, Long tripId, Double totalBudget, Double totalExpenses, Double remainingBudget, Double budgetUtilization, String notes) {
        this.id = id;
        this.tripId = tripId;
        this.totalBudget = totalBudget;
        this.totalExpenses = totalExpenses;
        this.remainingBudget = remainingBudget;
        this.budgetUtilization = budgetUtilization;
        this.notes = notes;
    }

    public static BudgetDtoBuilder builder() { return new BudgetDtoBuilder(); }

    public static class BudgetDtoBuilder {
        private Long id;
        private Long tripId;
        private Double totalBudget;
        private Double totalExpenses;
        private Double remainingBudget;
        private Double budgetUtilization;
        private String notes;

        public BudgetDtoBuilder id(Long id) { this.id = id; return this; }
        public BudgetDtoBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public BudgetDtoBuilder totalBudget(Double totalBudget) { this.totalBudget = totalBudget; return this; }
        public BudgetDtoBuilder totalExpenses(Double totalExpenses) { this.totalExpenses = totalExpenses; return this; }
        public BudgetDtoBuilder remainingBudget(Double remainingBudget) { this.remainingBudget = remainingBudget; return this; }
        public BudgetDtoBuilder budgetUtilization(Double budgetUtilization) { this.budgetUtilization = budgetUtilization; return this; }
        public BudgetDtoBuilder notes(String notes) { this.notes = notes; return this; }

        public BudgetDto build() {
            return new BudgetDto(id, tripId, totalBudget, totalExpenses, remainingBudget, budgetUtilization, notes);
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
}
