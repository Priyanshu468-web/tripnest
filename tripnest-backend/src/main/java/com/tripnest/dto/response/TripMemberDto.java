package com.tripnest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripMemberDto {
    private Long id;
    private UserDto user;
    private String role;
    private LocalDateTime joinedAt;
}
