package com.tripnest.dto;

import com.tripnest.entity.enums.ExpenseCategory;

import java.util.List;
import java.util.Map;

public class ExpenseSummaryDto {
    private Long tripId;
    private Double totalBudget;
    private Double totalExpenses;
    private Double remainingBudget;
    private Double budgetUtilization;
    private Double highestExpense;
    private Integer numberOfExpenses;
    private Map<ExpenseCategory, Double> categoryWiseExpenses;
    private List<ExpenseDto> expenses;

    public ExpenseSummaryDto() {}

    public ExpenseSummaryDto(Long tripId, Double totalBudget, Double totalExpenses, Double remainingBudget, Double budgetUtilization, Double highestExpense, Integer numberOfExpenses, Map<ExpenseCategory, Double> categoryWiseExpenses, List<ExpenseDto> expenses) {
        this.tripId = tripId;
        this.totalBudget = totalBudget;
        this.totalExpenses = totalExpenses;
        this.remainingBudget = remainingBudget;
        this.budgetUtilization = budgetUtilization;
        this.highestExpense = highestExpense;
        this.numberOfExpenses = numberOfExpenses;
        this.categoryWiseExpenses = categoryWiseExpenses;
        this.expenses = expenses;
    }

    public static ExpenseSummaryDtoBuilder builder() { return new ExpenseSummaryDtoBuilder(); }

    public static class ExpenseSummaryDtoBuilder {
        private Long tripId;
        private Double totalBudget;
        private Double totalExpenses;
        private Double remainingBudget;
        private Double budgetUtilization;
        private Double highestExpense;
        private Integer numberOfExpenses;
        private Map<ExpenseCategory, Double> categoryWiseExpenses;
        private List<ExpenseDto> expenses;

        public ExpenseSummaryDtoBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public ExpenseSummaryDtoBuilder totalBudget(Double totalBudget) { this.totalBudget = totalBudget; return this; }
        public ExpenseSummaryDtoBuilder totalExpenses(Double totalExpenses) { this.totalExpenses = totalExpenses; return this; }
        public ExpenseSummaryDtoBuilder remainingBudget(Double remainingBudget) { this.remainingBudget = remainingBudget; return this; }
        public ExpenseSummaryDtoBuilder budgetUtilization(Double budgetUtilization) { this.budgetUtilization = budgetUtilization; return this; }
        public ExpenseSummaryDtoBuilder highestExpense(Double highestExpense) { this.highestExpense = highestExpense; return this; }
        public ExpenseSummaryDtoBuilder numberOfExpenses(Integer numberOfExpenses) { this.numberOfExpenses = numberOfExpenses; return this; }
        public ExpenseSummaryDtoBuilder categoryWiseExpenses(Map<ExpenseCategory, Double> categoryWiseExpenses) { this.categoryWiseExpenses = categoryWiseExpenses; return this; }
        public ExpenseSummaryDtoBuilder expenses(List<ExpenseDto> expenses) { this.expenses = expenses; return this; }

        public ExpenseSummaryDto build() {
            return new ExpenseSummaryDto(tripId, totalBudget, totalExpenses, remainingBudget, budgetUtilization, highestExpense, numberOfExpenses, categoryWiseExpenses, expenses);
        }
    }

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

    public Double getHighestExpense() { return highestExpense; }
    public void setHighestExpense(Double highestExpense) { this.highestExpense = highestExpense; }

    public Integer getNumberOfExpenses() { return numberOfExpenses; }
    public void setNumberOfExpenses(Integer numberOfExpenses) { this.numberOfExpenses = numberOfExpenses; }

    public Map<ExpenseCategory, Double> getCategoryWiseExpenses() { return categoryWiseExpenses; }
    public void setCategoryWiseExpenses(Map<ExpenseCategory, Double> categoryWiseExpenses) { this.categoryWiseExpenses = categoryWiseExpenses; }

    public List<ExpenseDto> getExpenses() { return expenses; }
    public void setExpenses(List<ExpenseDto> expenses) { this.expenses = expenses; }
}
