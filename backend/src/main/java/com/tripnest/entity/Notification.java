package com.tripnest.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

<<<<<<< HEAD
    private String title;

    @Column(nullable = false, length = 1000)
    private String message;

    private String type; // TRIP_REMINDER, ACTIVITY_REMINDER, BUDGET_ALERT, GROUP_INVITE, TRAVEL_UPDATE, SYSTEM
    private Boolean isRead;
    private String linkUrl;
=======
    @Column(nullable = false)
    private String message;

    private String type;
    private Boolean isRead;
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    private LocalDateTime createdAt;

    public Notification() {}

<<<<<<< HEAD
    public Notification(Long id, Long userId, String title, String message, String type, Boolean isRead, String linkUrl, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
        this.linkUrl = linkUrl;
=======
    public Notification(Long id, Long userId, String message, String type, Boolean isRead, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (isRead == null) isRead = false;
        if (type == null) type = "SYSTEM";
<<<<<<< HEAD
        if (title == null) title = "TripNest Notification";
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    }

    public static NotificationBuilder builder() { return new NotificationBuilder(); }

    public static class NotificationBuilder {
        private Long id;
        private Long userId;
<<<<<<< HEAD
        private String title;
        private String message;
        private String type;
        private Boolean isRead;
        private String linkUrl;
=======
        private String message;
        private String type;
        private Boolean isRead;
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        private LocalDateTime createdAt;

        public NotificationBuilder id(Long id) { this.id = id; return this; }
        public NotificationBuilder userId(Long userId) { this.userId = userId; return this; }
<<<<<<< HEAD
        public NotificationBuilder title(String title) { this.title = title; return this; }
        public NotificationBuilder message(String message) { this.message = message; return this; }
        public NotificationBuilder type(String type) { this.type = type; return this; }
        public NotificationBuilder isRead(Boolean isRead) { this.isRead = isRead; return this; }
        public NotificationBuilder linkUrl(String linkUrl) { this.linkUrl = linkUrl; return this; }
        public NotificationBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Notification build() {
            return new Notification(id, userId, title, message, type, isRead, linkUrl, createdAt);
=======
        public NotificationBuilder message(String message) { this.message = message; return this; }
        public NotificationBuilder type(String type) { this.type = type; return this; }
        public NotificationBuilder isRead(Boolean isRead) { this.isRead = isRead; return this; }
        public NotificationBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Notification build() {
            return new Notification(id, userId, message, type, isRead, createdAt);
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

<<<<<<< HEAD
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

<<<<<<< HEAD
    public String getLinkUrl() { return linkUrl; }
    public void setLinkUrl(String linkUrl) { this.linkUrl = linkUrl; }

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
