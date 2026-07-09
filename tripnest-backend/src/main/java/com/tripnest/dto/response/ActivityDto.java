package com.tripnest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityDto {
    private Long id;
    private Long itineraryId;
    private String name;
    private String category;
    private LocalTime startTime;
    private LocalTime endTime;
    private String location;
    private String notes;
    private BigDecimal cost;
    private Integer order;
}
