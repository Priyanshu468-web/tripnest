package com.tripnest.service;

import com.tripnest.dto.UserProfileDto;
import com.tripnest.entity.User;
import com.tripnest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    @Autowired
    public UserService(UserRepository userRepository, AuthService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    public UserProfileDto getProfile() {
        User user = authService.getCurrentUser();
        return mapToDto(user);
    }

    @Transactional
    public UserProfileDto updateProfile(UserProfileDto updateDto) {
        User user = authService.getCurrentUser();

        if (updateDto.getName() != null && !updateDto.getName().isBlank()) {
            user.setName(updateDto.getName());
        }
        if (updateDto.getPhone() != null) {
            user.setPhone(updateDto.getPhone());
        }
        if (updateDto.getBio() != null) {
            user.setBio(updateDto.getBio());
        }
        if (updateDto.getAvatarUrl() != null) {
            user.setAvatarUrl(updateDto.getAvatarUrl());
        }

        User savedUser = userRepository.save(user);
        return mapToDto(savedUser);
    }

    public UserProfileDto mapToDto(User user) {
        return UserProfileDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .phone(user.getPhone())
                .avatarUrl(user.getAvatarUrl())
                .bio(user.getBio())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
