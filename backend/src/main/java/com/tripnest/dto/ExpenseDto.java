package com.tripnest.dto;

import com.tripnest.entity.enums.ExpenseCategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ExpenseDto {
    private Long id;
    private Long tripId;

    @NotNull
    @Min(0)
    private Double amount;

    @NotNull
    private ExpenseCategory category;

    private String description;

    @NotNull
    private LocalDate expenseDate;

    private String paidBy;
    private LocalDateTime createdAt;

    public ExpenseDto() {}

    public ExpenseDto(Long id, Long tripId, Double amount, ExpenseCategory category, String description, LocalDate expenseDate, String paidBy, LocalDateTime createdAt) {
        this.id = id;
        this.tripId = tripId;
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.expenseDate = expenseDate;
        this.paidBy = paidBy;
        this.createdAt = createdAt;
    }

    public static ExpenseDtoBuilder builder() { return new ExpenseDtoBuilder(); }

    public static class ExpenseDtoBuilder {
        private Long id;
        private Long tripId;
        private Double amount;
        private ExpenseCategory category;
        private String description;
        private LocalDate expenseDate;
        private String paidBy;
        private LocalDateTime createdAt;

        public ExpenseDtoBuilder id(Long id) { this.id = id; return this; }
        public ExpenseDtoBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public ExpenseDtoBuilder amount(Double amount) { this.amount = amount; return this; }
        public ExpenseDtoBuilder category(ExpenseCategory category) { this.category = category; return this; }
        public ExpenseDtoBuilder description(String description) { this.description = description; return this; }
        public ExpenseDtoBuilder expenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; return this; }
        public ExpenseDtoBuilder paidBy(String paidBy) { this.paidBy = paidBy; return this; }
        public ExpenseDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ExpenseDto build() {
            return new ExpenseDto(id, tripId, amount, category, description, expenseDate, paidBy, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public ExpenseCategory getCategory() { return category; }
    public void setCategory(ExpenseCategory category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getExpenseDate() { return expenseDate; }
    public void setExpenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; }

    public String getPaidBy() { return paidBy; }
    public void setPaidBy(String paidBy) { this.paidBy = paidBy; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
