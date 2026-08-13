package com.tripnest.service;

import com.tripnest.dto.UserProfileDto;
import com.tripnest.entity.User;
import com.tripnest.entity.enums.RoleName;
import com.tripnest.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthService authService;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("user@tripnest.com")
                .name("Alex Traveler")
                .role(RoleName.TRAVELER)
                .phone("+1 555 1234")
                .bio("Loves mountains")
                .build();
    }

    @Test
    void testGetProfile_Success() {
        when(authService.getCurrentUser()).thenReturn(testUser);

        UserProfileDto profile = userService.getProfile();

        assertNotNull(profile);
        assertEquals("user@tripnest.com", profile.getEmail());
        assertEquals("Alex Traveler", profile.getName());
    }
}
