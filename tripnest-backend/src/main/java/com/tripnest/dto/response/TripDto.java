package com.tripnest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripDto {
    private Long id;
    private Long userId; // Creator ID
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    private BigDecimal budget;
    private String status;
    private String imageUrl;
    private Boolean isPublic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<TripMemberDto> members;
}
