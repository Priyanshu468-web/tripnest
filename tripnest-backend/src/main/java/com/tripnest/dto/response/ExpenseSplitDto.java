package com.tripnest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseSplitDto {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private BigDecimal shareAmount;
}
