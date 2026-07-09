package com.tripnest.controller;

import com.tripnest.dto.response.UserDto;
import com.tripnest.security.SecurityUtil;
import com.tripnest.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile() {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(userService.getProfile(email));
    }

    @PatchMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(@RequestBody Map<String, String> body) {
        String email = SecurityUtil.getCurrentUserEmail()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        String name = body.get("name");
        String avatarUrl = body.get("avatarUrl");
        return ResponseEntity.ok(userService.updateProfile(email, name, avatarUrl));
    }
}
