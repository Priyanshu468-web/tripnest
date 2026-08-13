package com.tripnest.dto;

import com.tripnest.entity.enums.RoleName;
import java.time.LocalDateTime;

public class UserProfileDto {
    private Long id;
    private String email;
    private String name;
    private RoleName role;
    private String phone;
    private String avatarUrl;
    private String bio;
    private LocalDateTime createdAt;

    public UserProfileDto() {}

    public UserProfileDto(Long id, String email, String name, RoleName role, String phone, String avatarUrl, String bio, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.phone = phone;
        this.avatarUrl = avatarUrl;
        this.bio = bio;
        this.createdAt = createdAt;
    }

    public static UserProfileDtoBuilder builder() { return new UserProfileDtoBuilder(); }

    public static class UserProfileDtoBuilder {
        private Long id;
        private String email;
        private String name;
        private RoleName role;
        private String phone;
        private String avatarUrl;
        private String bio;
        private LocalDateTime createdAt;

        public UserProfileDtoBuilder id(Long id) { this.id = id; return this; }
        public UserProfileDtoBuilder email(String email) { this.email = email; return this; }
        public UserProfileDtoBuilder name(String name) { this.name = name; return this; }
        public UserProfileDtoBuilder role(RoleName role) { this.role = role; return this; }
        public UserProfileDtoBuilder phone(String phone) { this.phone = phone; return this; }
        public UserProfileDtoBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public UserProfileDtoBuilder bio(String bio) { this.bio = bio; return this; }
        public UserProfileDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public UserProfileDto build() {
            return new UserProfileDto(id, email, name, role, phone, avatarUrl, bio, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public RoleName getRole() { return role; }
    public void setRole(RoleName role) { this.role = role; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
