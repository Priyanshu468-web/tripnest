package com.tripnest.dto;

import java.time.LocalDateTime;

public class NotificationDto {
    private Long id;
    private Long userId;
    private String message;
    private String type;
    private Boolean isRead;
    private LocalDateTime createdAt;

    public NotificationDto() {}

    public NotificationDto(Long id, Long userId, String message, String type, Boolean isRead, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.type = type;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }

    public static NotificationDtoBuilder builder() { return new NotificationDtoBuilder(); }

    public static class NotificationDtoBuilder {
        private Long id;
        private Long userId;
        private String message;
        private String type;
        private Boolean isRead;
        private LocalDateTime createdAt;

        public NotificationDtoBuilder id(Long id) { this.id = id; return this; }
        public NotificationDtoBuilder userId(Long userId) { this.userId = userId; return this; }
        public NotificationDtoBuilder message(String message) { this.message = message; return this; }
        public NotificationDtoBuilder type(String type) { this.type = type; return this; }
        public NotificationDtoBuilder isRead(Boolean isRead) { this.isRead = isRead; return this; }
        public NotificationDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public NotificationDto build() {
            return new NotificationDto(id, userId, message, type, isRead, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
