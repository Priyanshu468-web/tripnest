package com.tripnest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItineraryDto {
    private Long id;
    private Long tripId;
    private Integer day;
    private LocalDate date;
    private String title;
    private List<ActivityDto> activities;
}
