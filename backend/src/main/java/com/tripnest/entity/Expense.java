package com.tripnest.entity;

import com.tripnest.entity.enums.ExpenseCategory;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long tripId;

    @Column(nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExpenseCategory category;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private LocalDate expenseDate;

    private String paidBy;
    private LocalDateTime createdAt;

    public Expense() {}

    public Expense(Long id, Long tripId, Double amount, ExpenseCategory category, String description, LocalDate expenseDate, String paidBy, LocalDateTime createdAt) {
        this.id = id;
        this.tripId = tripId;
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.expenseDate = expenseDate;
        this.paidBy = paidBy;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (expenseDate == null) expenseDate = LocalDate.now();
        if (category == null) category = ExpenseCategory.MISCELLANEOUS;
    }

    public static ExpenseBuilder builder() { return new ExpenseBuilder(); }

    public static class ExpenseBuilder {
        private Long id;
        private Long tripId;
        private Double amount;
        private ExpenseCategory category;
        private String description;
        private LocalDate expenseDate;
        private String paidBy;
        private LocalDateTime createdAt;

        public ExpenseBuilder id(Long id) { this.id = id; return this; }
        public ExpenseBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public ExpenseBuilder amount(Double amount) { this.amount = amount; return this; }
        public ExpenseBuilder category(ExpenseCategory category) { this.category = category; return this; }
        public ExpenseBuilder description(String description) { this.description = description; return this; }
        public ExpenseBuilder expenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; return this; }
        public ExpenseBuilder paidBy(String paidBy) { this.paidBy = paidBy; return this; }
        public ExpenseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Expense build() {
            return new Expense(id, tripId, amount, category, description, expenseDate, paidBy, createdAt);
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
