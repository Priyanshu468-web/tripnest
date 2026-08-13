package com.tripnest.dto;

import java.time.LocalDateTime;

public class NotificationDto {
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

    public NotificationDto() {}

<<<<<<< HEAD
    public NotificationDto(Long id, Long userId, String title, String message, String type, Boolean isRead, String linkUrl, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
        this.linkUrl = linkUrl;
=======
    public NotificationDto(Long id, Long userId, String message, String type, Boolean isRead, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        this.createdAt = createdAt;
    }

    public static NotificationDtoBuilder builder() { return new NotificationDtoBuilder(); }

    public static class NotificationDtoBuilder {
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

        public NotificationDtoBuilder id(Long id) { this.id = id; return this; }
        public NotificationDtoBuilder userId(Long userId) { this.userId = userId; return this; }
<<<<<<< HEAD
        public NotificationDtoBuilder title(String title) { this.title = title; return this; }
        public NotificationDtoBuilder message(String message) { this.message = message; return this; }
        public NotificationDtoBuilder type(String type) { this.type = type; return this; }
        public NotificationDtoBuilder isRead(Boolean isRead) { this.isRead = isRead; return this; }
        public NotificationDtoBuilder linkUrl(String linkUrl) { this.linkUrl = linkUrl; return this; }
        public NotificationDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public NotificationDto build() {
            return new NotificationDto(id, userId, title, message, type, isRead, linkUrl, createdAt);
=======
        public NotificationDtoBuilder message(String message) { this.message = message; return this; }
        public NotificationDtoBuilder type(String type) { this.type = type; return this; }
        public NotificationDtoBuilder isRead(Boolean isRead) { this.isRead = isRead; return this; }
        public NotificationDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public NotificationDto build() {
            return new NotificationDto(id, userId, message, type, isRead, createdAt);
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
