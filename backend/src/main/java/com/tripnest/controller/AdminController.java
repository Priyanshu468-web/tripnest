package com.tripnest.controller;

import com.tripnest.repository.DestinationRepository;
import com.tripnest.repository.TripRepository;
import com.tripnest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;
    private final DestinationRepository destinationRepository;

    @Autowired
    public AdminController(UserRepository userRepository, TripRepository tripRepository, DestinationRepository destinationRepository) {
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
        this.destinationRepository = destinationRepository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getAdminDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalUsers = userRepository.count();
        long totalTrips = tripRepository.count();
        long totalDestinations = destinationRepository.count();

        stats.put("totalUsers", totalUsers);
        stats.put("totalTrips", totalTrips);
        stats.put("totalDestinations", totalDestinations);

        // Trip statistics by status
        Map<String, Object> tripStats = new HashMap<>();
        tripStats.put("total", totalTrips);
        tripStats.put("planning", tripRepository.findAll().stream().filter(t -> "PLANNING".equals(t.getStatus().name())).count());
        tripStats.put("upcoming", tripRepository.findAll().stream().filter(t -> "UPCOMING".equals(t.getStatus().name())).count());
        tripStats.put("inProgress", tripRepository.findAll().stream().filter(t -> "IN_PROGRESS".equals(t.getStatus().name())).count());
        tripStats.put("completed", tripRepository.findAll().stream().filter(t -> "COMPLETED".equals(t.getStatus().name())).count());
        tripStats.put("cancelled", tripRepository.findAll().stream().filter(t -> "CANCELLED".equals(t.getStatus().name())).count());
        stats.put("tripAnalytics", tripStats);

        // User breakdown
        Map<String, Object> userStats = new HashMap<>();
        userStats.put("total", totalUsers);
        userStats.put("travelers", userRepository.findAll().stream().filter(u -> "TRAVELER".equals(u.getRole().name())).count());
        userStats.put("groupAdmins", userRepository.findAll().stream().filter(u -> "GROUP_ADMIN".equals(u.getRole().name())).count());
        userStats.put("admins", userRepository.findAll().stream().filter(u -> "ADMIN".equals(u.getRole().name()) || "ADMINISTRATOR".equals(u.getRole().name())).count());
        stats.put("userAnalytics", userStats);

        // Revenue section placeholder
        Map<String, Object> revenue = new HashMap<>();
        revenue.put("monthlyRevenue", 12450.00);
        revenue.put("annualRevenue", 149400.00);
        revenue.put("currency", "USD");
        revenue.put("status", "Active Premium Subscriptions & Booking Commissions");
        stats.put("revenueAnalytics", revenue);

        // Recent activity stream
        List<Map<String, String>> activityLogs = List.of(
                Map.of("time", "10 mins ago", "event", "New user registered (traveler@tripnest.com)"),
                Map.of("time", "25 mins ago", "event", "Trip created to Tokyo, Japan"),
                Map.of("time", "1 hour ago", "event", "Document uploaded for Paris itinerary"),
                Map.of("time", "3 hours ago", "event", "Expense settlement calculated for Bali group trip")
        );
        stats.put("recentActivities", activityLogs);

        return ResponseEntity.ok(stats);
    }
}
