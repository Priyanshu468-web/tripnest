package com.tripnest.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateActivityRequest {

    @NotBlank(message = "Activity name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    private LocalTime startTime;

    private LocalTime endTime;

    private String location;

    private String notes;

    @PositiveOrZero(message = "Cost must be zero or positive")
    private BigDecimal cost;

    private Integer order;
}
