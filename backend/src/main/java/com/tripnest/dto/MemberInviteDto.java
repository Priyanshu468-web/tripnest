package com.tripnest.dto;

import com.tripnest.entity.enums.MemberRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class MemberInviteDto {
    @NotBlank
    @Email
    private String email;

    private MemberRole role = MemberRole.MEMBER;

    public MemberInviteDto() {}

    public MemberInviteDto(String email, MemberRole role) {
        this.email = email;
        this.role = role != null ? role : MemberRole.MEMBER;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public MemberRole getRole() { return role; }
    public void setRole(MemberRole role) { this.role = role; }
}
