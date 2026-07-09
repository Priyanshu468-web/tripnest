package com.tripnest.controller;

import com.tripnest.dto.request.CreateExpenseRequest;
import com.tripnest.dto.response.ExpenseDto;
import com.tripnest.security.SecurityUtil;
import com.tripnest.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("/trips/{tripId}/expenses")
    public ResponseEntity<ExpenseDto> createExpense(
            @PathVariable Long tripId,
            @Valid @RequestBody CreateExpenseRequest request) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(expenseService.createExpense(tripId, request, email));
    }

    @GetMapping("/trips/{tripId}/expenses")
    public ResponseEntity<List<ExpenseDto>> getExpenses(@PathVariable Long tripId) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(expenseService.getExpenses(tripId, email));
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Map<String, String>> deleteExpense(@PathVariable Long id) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        expenseService.deleteExpense(id, email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Expense deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/trips/{tripId}/settlement")
    public ResponseEntity<Map<String, Object>> getSettlement(@PathVariable Long tripId) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        List<Map<String, Object>> settlements = expenseService.calculateSettlement(tripId, email);
        Map<String, Object> response = new HashMap<>();
        response.put("settlements", settlements);
        return ResponseEntity.ok(response);
    }
}
