package com.tripnest.controller;

import com.tripnest.dto.response.BudgetDto;
import com.tripnest.security.SecurityUtil;
import com.tripnest.service.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/trips/{tripId}/budget")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping
    public ResponseEntity<BudgetDto> getBudget(@PathVariable Long tripId) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(budgetService.getBudgetDetails(tripId, email));
    }

    @PatchMapping
    public ResponseEntity<BudgetDto> updateBudget(@PathVariable Long tripId, @RequestBody Map<String, BigDecimal> body) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        BigDecimal allocated = body.get("allocated");
        if (allocated == null) {
            throw new IllegalArgumentException("Allocated budget amount is required");
        }
        return ResponseEntity.ok(budgetService.updateBudget(tripId, allocated, email));
    }
}
