package com.tripnest.dto;

import jakarta.validation.constraints.NotBlank;

public class GoogleAuthRequest {

    @NotBlank(message = "Google ID token or credential is required")
    private String credential;

    private String email;
    private String name;
    private String avatarUrl;

    public GoogleAuthRequest() {}

    public GoogleAuthRequest(String credential, String email, String name, String avatarUrl) {
        this.credential = credential;
        this.email = email;
        this.name = name;
        this.avatarUrl = avatarUrl;
    }

    public String getCredential() { return credential; }
    public void setCredential(String credential) { this.credential = credential; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
