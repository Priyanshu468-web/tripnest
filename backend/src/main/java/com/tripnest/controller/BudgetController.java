package com.tripnest.controller;

import com.tripnest.dto.BudgetDto;
import com.tripnest.service.BudgetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips/{tripId}/budget")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BudgetController {

    private final BudgetService budgetService;

    @Autowired
    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping
    public ResponseEntity<BudgetDto> getBudget(@PathVariable Long tripId) {
        return ResponseEntity.ok(budgetService.getBudgetByTrip(tripId));
    }

    @PostMapping
    public ResponseEntity<BudgetDto> createBudget(@PathVariable Long tripId, @Valid @RequestBody BudgetDto dto) {
        return ResponseEntity.ok(budgetService.saveOrUpdateBudget(tripId, dto));
    }

    @PutMapping
    public ResponseEntity<BudgetDto> updateBudget(@PathVariable Long tripId, @Valid @RequestBody BudgetDto dto) {
        return ResponseEntity.ok(budgetService.saveOrUpdateBudget(tripId, dto));
    }
}
