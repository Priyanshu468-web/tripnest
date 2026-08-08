package com.tripnest.entity;

import com.tripnest.entity.enums.MemberRole;
import com.tripnest.entity.enums.MemberStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "trip_members")
public class TripMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long tripId;

    private Long userId;

    @Column(nullable = false)
    private String userEmail;

    private String userName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberRole role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus status;

    private LocalDateTime joinedAt;

    public TripMember() {}

    public TripMember(Long id, Long tripId, Long userId, String userEmail, String userName, MemberRole role, MemberStatus status, LocalDateTime joinedAt) {
        this.id = id;
        this.tripId = tripId;
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.role = role;
        this.status = status;
        this.joinedAt = joinedAt;
    }

    @PrePersist
    protected void onCreate() {
        joinedAt = LocalDateTime.now();
        if (role == null) role = MemberRole.MEMBER;
        if (status == null) status = MemberStatus.PENDING;
    }

    public static TripMemberBuilder builder() { return new TripMemberBuilder(); }

    public static class TripMemberBuilder {
        private Long id;
        private Long tripId;
        private Long userId;
        private String userEmail;
        private String userName;
        private MemberRole role;
        private MemberStatus status;
        private LocalDateTime joinedAt;

        public TripMemberBuilder id(Long id) { this.id = id; return this; }
        public TripMemberBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public TripMemberBuilder userId(Long userId) { this.userId = userId; return this; }
        public TripMemberBuilder userEmail(String userEmail) { this.userEmail = userEmail; return this; }
        public TripMemberBuilder userName(String userName) { this.userName = userName; return this; }
        public TripMemberBuilder role(MemberRole role) { this.role = role; return this; }
        public TripMemberBuilder status(MemberStatus status) { this.status = status; return this; }
        public TripMemberBuilder joinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; return this; }

        public TripMember build() {
            return new TripMember(id, tripId, userId, userEmail, userName, role, status, joinedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

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
