package com.tripnest.controller;

import com.tripnest.dto.ExpenseDto;
import com.tripnest.dto.ExpenseSummaryDto;
import com.tripnest.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/expenses")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ExpenseController {

    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<ExpenseDto> addExpense(@PathVariable Long tripId, @Valid @RequestBody ExpenseDto dto) {
        return ResponseEntity.ok(expenseService.addExpense(tripId, dto));
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDto>> getExpenses(@PathVariable Long tripId) {
        return ResponseEntity.ok(expenseService.getExpensesByTrip(tripId));
    }

    @GetMapping("/summary")
    public ResponseEntity<ExpenseSummaryDto> getExpenseSummary(@PathVariable Long tripId) {
        return ResponseEntity.ok(expenseService.getExpenseSummary(tripId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseDto> getExpenseById(@PathVariable Long tripId, @PathVariable Long id) {
        return ResponseEntity.ok(expenseService.getExpenseById(tripId, id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDto> updateExpense(@PathVariable Long tripId, @PathVariable Long id, @RequestBody ExpenseDto dto) {
        return ResponseEntity.ok(expenseService.updateExpense(tripId, id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long tripId, @PathVariable Long id) {
        expenseService.deleteExpense(tripId, id);
        return ResponseEntity.ok().body("{\"message\": \"Expense deleted successfully\"}");
    }
}
