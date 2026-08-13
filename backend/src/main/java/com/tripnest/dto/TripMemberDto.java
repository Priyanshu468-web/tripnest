package com.tripnest.dto;

import com.tripnest.entity.enums.MemberRole;
import com.tripnest.entity.enums.MemberStatus;

import java.time.LocalDateTime;

public class TripMemberDto {
    private Long id;
    private Long tripId;
    private String tripDestination;
    private Long userId;
    private String userEmail;
    private String userName;
    private MemberRole role;
    private MemberStatus status;
    private LocalDateTime joinedAt;

    public TripMemberDto() {}

    public TripMemberDto(Long id, Long tripId, String tripDestination, Long userId, String userEmail, String userName, MemberRole role, MemberStatus status, LocalDateTime joinedAt) {
        this.id = id;
        this.tripId = tripId;
        this.tripDestination = tripDestination;
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.role = role;
        this.status = status;
        this.joinedAt = joinedAt;
    }

    public static TripMemberDtoBuilder builder() { return new TripMemberDtoBuilder(); }

    public static class TripMemberDtoBuilder {
        private Long id;
        private Long tripId;
        private String tripDestination;
        private Long userId;
        private String userEmail;
        private String userName;
        private MemberRole role;
        private MemberStatus status;
        private LocalDateTime joinedAt;

        public TripMemberDtoBuilder id(Long id) { this.id = id; return this; }
        public TripMemberDtoBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public TripMemberDtoBuilder tripDestination(String tripDestination) { this.tripDestination = tripDestination; return this; }
        public TripMemberDtoBuilder userId(Long userId) { this.userId = userId; return this; }
        public TripMemberDtoBuilder userEmail(String userEmail) { this.userEmail = userEmail; return this; }
        public TripMemberDtoBuilder userName(String userName) { this.userName = userName; return this; }
        public TripMemberDtoBuilder role(MemberRole role) { this.role = role; return this; }
        public TripMemberDtoBuilder status(MemberStatus status) { this.status = status; return this; }
        public TripMemberDtoBuilder joinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; return this; }

        public TripMemberDto build() {
            return new TripMemberDto(id, tripId, tripDestination, userId, userEmail, userName, role, status, joinedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public String getTripDestination() { return tripDestination; }
    public void setTripDestination(String tripDestination) { this.tripDestination = tripDestination; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public MemberRole getRole() { return role; }
    public void setRole(MemberRole role) { this.role = role; }

    public MemberStatus getStatus() { return status; }
    public void setStatus(MemberStatus status) { this.status = status; }

    public LocalDateTime getJoinedAt() { return joinedAt; }
    public void setJoinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; }
}
