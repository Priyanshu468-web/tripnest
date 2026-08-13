package com.tripnest.service;

import com.tripnest.dto.NotificationDto;
import com.tripnest.entity.Notification;
import com.tripnest.entity.User;
import com.tripnest.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public Map<String, Long> getUnreadCount() {
        User currentUser = authService.getCurrentUser();
        long count = notificationRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId())
                .stream().filter(n -> !Boolean.TRUE.equals(n.getIsRead())).count();
        return Map.of("unreadCount", count);
    }

    @Transactional
    public void createNotification(Long userId, String title, String message, String type, String linkUrl) {
        Notification notification = Notification.builder()
                .userId(userId)
                .title(title)
                .message(message)
                .type(type)
                .linkUrl(linkUrl)
                .isRead(false)
                .build();
        notificationRepository.save(notification);
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

    @Transactional
    public void markAllAsRead() {
        User currentUser = authService.getCurrentUser();
        List<Notification> list = notificationRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId());
        list.forEach(n -> n.setIsRead(true));
        notificationRepository.saveAll(list);
    }

    private NotificationDto mapToDto(Notification n) {
        return NotificationDto.builder()
                .id(n.getId())
                .userId(n.getUserId())
                .title(n.getTitle())
                .message(n.getMessage())
                .type(n.getType())
                .isRead(n.getIsRead())
                .linkUrl(n.getLinkUrl())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
