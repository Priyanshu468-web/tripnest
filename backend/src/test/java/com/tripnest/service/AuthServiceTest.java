package com.tripnest.service;

import com.tripnest.config.JwtUtils;
import com.tripnest.dto.AuthRequest;
import com.tripnest.dto.AuthResponse;
import com.tripnest.dto.RegisterRequest;
import com.tripnest.entity.User;
import com.tripnest.entity.enums.RoleName;
import com.tripnest.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;
    private AuthRequest authRequest;
    private User testUser;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setEmail("test@tripnest.com");
        registerRequest.setPassword("password123");
        registerRequest.setName("Test User");
        registerRequest.setRole(RoleName.TRAVELER);

        authRequest = new AuthRequest();
        authRequest.setEmail("test@tripnest.com");
        authRequest.setPassword("password123");

        testUser = User.builder()
                .id(1L)
                .email("test@tripnest.com")
                .name("Test User")
                .password("encoded_pass")
                .role(RoleName.TRAVELER)
                .build();
    }

    @Test
    void testRegister_Success() {
        when(userRepository.existsByEmail("test@tripnest.com")).thenReturn(false);
        when(passwordEncoder.encode(any())).thenReturn("encoded_pass");
        when(userRepository.save(any())).thenReturn(testUser);

        Authentication auth = mock(Authentication.class);
        when(authenticationManager.authenticate(any())).thenReturn(auth);
        when(jwtUtils.generateJwtToken(any())).thenReturn("mock_jwt_token");

        AuthResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("mock_jwt_token", response.getToken());
        assertEquals("test@tripnest.com", response.getEmail());
        verify(userRepository, times(1)).save(any());
    }
}
