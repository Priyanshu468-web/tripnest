package com.tripnest.service;

import com.tripnest.dto.NotificationDto;
import com.tripnest.entity.Notification;
import com.tripnest.entity.User;
import com.tripnest.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final AuthService authService;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, AuthService authService) {
        this.notificationRepository = notificationRepository;
        this.authService = authService;
    }

    public List<NotificationDto> getMyNotifications() {
        User currentUser = authService.getCurrentUser();
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId())
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public void markAsRead(Long id) {
        User currentUser = authService.getCurrentUser();
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notification.getUserId().equals(currentUser.getId())) {
            throw new RuntimeException("Access Denied");
        }

        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    private NotificationDto mapToDto(Notification n) {
        return NotificationDto.builder()
                .id(n.getId())
                .userId(n.getUserId())
                .message(n.getMessage())
                .type(n.getType())
                .isRead(n.getIsRead())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
