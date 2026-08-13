package com.tripnest.service;

import com.tripnest.dto.NotificationDto;
import com.tripnest.entity.Notification;
import com.tripnest.entity.User;
import com.tripnest.entity.enums.RoleName;
import com.tripnest.repository.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private AuthService authService;

    @InjectMocks
    private NotificationService notificationService;

    private User testUser;
    private Notification testNotification;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("user@tripnest.com")
                .name("Alex")
                .role(RoleName.TRAVELER)
                .build();

        testNotification = Notification.builder()
                .id(5L)
                .userId(1L)
                .title("Trip Invite")
                .message("You have been invited to Paris trip")
                .type("GROUP_INVITE")
                .isRead(false)
                .build();
    }

    @Test
    void testGetMyNotifications_Success() {
        when(authService.getCurrentUser()).thenReturn(testUser);
        when(notificationRepository.findByUserIdOrderByCreatedAtDesc(1L)).thenReturn(List.of(testNotification));

        List<NotificationDto> list = notificationService.getMyNotifications();

        assertNotNull(list);
        assertEquals(1, list.size());
        assertEquals("Trip Invite", list.get(0).getTitle());
        assertFalse(list.get(0).getIsRead());
    }
}
