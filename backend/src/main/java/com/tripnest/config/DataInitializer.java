package com.tripnest.config;

import com.tripnest.entity.User;
import com.tripnest.entity.enums.RoleName;
import com.tripnest.repository.UserRepository;
import com.tripnest.service.DestinationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final DestinationService destinationService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(DestinationService destinationService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.destinationService = destinationService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        destinationService.seedDestinations();
    }

    private void seedUsers() {
        if (!userRepository.existsByEmail("admin@tripnest.com")) {
            User admin = User.builder()
                    .name("System Admin")
                    .email("admin@tripnest.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(RoleName.ADMIN)
                    .phone("+1 555-0199")
                    .bio("TripNest System Administrator")
                    .build();
            userRepository.save(admin);
        }

        if (!userRepository.existsByEmail("traveler@tripnest.com")) {
            User traveler = User.builder()
                    .name("Alex Traveler")
                    .email("traveler@tripnest.com")
                    .password(passwordEncoder.encode("traveler123"))
                    .role(RoleName.TRAVELER)
                    .phone("+1 555-0123")
                    .bio("Avid explorer and photographer.")
                    .build();
            userRepository.save(traveler);
        }
    }
}
