package com.tripnest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetDto {
    private BigDecimal allocated;
    private BigDecimal spent;
    private BigDecimal remaining;
    private BigDecimal pctUsed;
    private Map<String, BigDecimal> byCategory;
}
