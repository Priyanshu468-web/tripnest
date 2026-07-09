package com.tripnest.controller;

import com.tripnest.config.JwtTokenProvider;
import com.tripnest.dto.request.LoginRequest;
import com.tripnest.dto.request.RegisterRequest;
import com.tripnest.dto.response.AuthResponse;
import com.tripnest.dto.response.UserDto;
import com.tripnest.security.SecurityUtil;
import com.tripnest.service.AuthService;
import com.tripnest.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final JwtTokenProvider tokenProvider;

    public AuthController(AuthService authService, UserService userService, JwtTokenProvider tokenProvider) {
        this.authService = authService;
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refresh(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        Map<String, Object> response = new HashMap<>();
        if (token != null && tokenProvider.validateToken(token)) {
            String email = tokenProvider.getEmailFromToken(token);
            String newToken = tokenProvider.generateToken(email);
            response.put("token", newToken);
            response.put("expiresIn", tokenProvider.getExpirationTime() / 1000);
            return ResponseEntity.ok(response);
        }
        response.put("message", "Invalid or expired token");
        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getMe() {
        Map<String, Object> response = new HashMap<>();
        String email = SecurityUtil.getCurrentUserEmail().orElse(null);
        if (email != null) {
            UserDto profile = userService.getProfile(email);
            response.put("user", profile);
            return ResponseEntity.ok(response);
        }
        response.put("message", "Not authenticated");
        return ResponseEntity.status(401).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout successful");
        return ResponseEntity.ok(response);
    }
}
