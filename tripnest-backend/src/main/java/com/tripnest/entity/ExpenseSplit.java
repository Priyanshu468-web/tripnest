package com.tripnest.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "expense_splits", uniqueConstraints = {@UniqueConstraint(columnNames = {"expense_id", "user_id"})})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"expense", "user"})
public class ExpenseSplit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expense_id", nullable = false)
    private Expense expense;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "share_amount", nullable = false)
    private BigDecimal shareAmount;
}
