package com.tripnest.service;

import com.tripnest.dto.MemberInviteDto;
import com.tripnest.dto.TripMemberDto;
import com.tripnest.entity.Notification;
import com.tripnest.entity.Trip;
import com.tripnest.entity.TripMember;
import com.tripnest.entity.User;
import com.tripnest.entity.enums.MemberRole;
import com.tripnest.entity.enums.MemberStatus;
import com.tripnest.repository.NotificationRepository;
import com.tripnest.repository.TripMemberRepository;
import com.tripnest.repository.TripRepository;
import com.tripnest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TripMemberService {

    private final TripMemberRepository tripMemberRepository;
    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final TripService tripService;
    private final AuthService authService;

    @Autowired
    public TripMemberService(TripMemberRepository tripMemberRepository, TripRepository tripRepository, UserRepository userRepository, NotificationRepository notificationRepository, TripService tripService, AuthService authService) {
        this.tripMemberRepository = tripMemberRepository;
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
        this.tripService = tripService;
        this.authService = authService;
    }

    @Transactional
    public TripMemberDto inviteUser(Long tripId, MemberInviteDto inviteDto) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateModifyPermission(trip, currentUser);

        Optional<TripMember> existingOpt = tripMemberRepository.findByTripIdAndUserEmail(tripId, inviteDto.getEmail());
        if (existingOpt.isPresent()) {
            throw new RuntimeException("User with email " + inviteDto.getEmail() + " is already invited or a member");
        }

        Optional<User> invitedUserOpt = userRepository.findByEmail(inviteDto.getEmail());

        TripMember member = TripMember.builder()
                .tripId(tripId)
                .userId(invitedUserOpt.map(User::getId).orElse(null))
                .userEmail(inviteDto.getEmail())
                .userName(invitedUserOpt.map(User::getName).orElse(inviteDto.getEmail()))
                .role(inviteDto.getRole() != null ? inviteDto.getRole() : MemberRole.MEMBER)
                .status(MemberStatus.PENDING)
                .build();

        TripMember saved = tripMemberRepository.save(member);

        invitedUserOpt.ifPresent(invitedUser -> {
            Notification notification = Notification.builder()
                    .userId(invitedUser.getId())
                    .message("You have been invited to join trip to " + trip.getDestination() + " by " + currentUser.getName())
                    .type("INVITE")
                    .build();
            notificationRepository.save(notification);
        });

        return mapToDto(saved);
    }

    public List<TripMemberDto> getMembersByTrip(Long tripId) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateAccess(trip, currentUser);

        return tripMemberRepository.findByTripId(tripId)
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<TripMemberDto> getMyInvitations() {
        User currentUser = authService.getCurrentUser();
        List<TripMember> pending = tripMemberRepository.findByUserEmailAndStatus(currentUser.getEmail(), MemberStatus.PENDING);
        return pending.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public TripMemberDto respondToInvitation(Long memberId, Boolean accept) {
        User currentUser = authService.getCurrentUser();
        TripMember member = tripMemberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Invitation not found"));

        if (!member.getUserEmail().equalsIgnoreCase(currentUser.getEmail())) {
            throw new RuntimeException("Access Denied: This invitation is not for you");
        }

        member.setUserId(currentUser.getId());
        member.setUserName(currentUser.getName());
        member.setStatus(accept ? MemberStatus.ACCEPTED : MemberStatus.REJECTED);

        TripMember updated = tripMemberRepository.save(member);
        return mapToDto(updated);
    }

    @Transactional
    public void removeMember(Long tripId, Long memberId) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateModifyPermission(trip, currentUser);

        TripMember member = tripMemberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        if (member.getRole() == MemberRole.OWNER) {
            throw new RuntimeException("Cannot remove the OWNER of the trip");
        }

        tripMemberRepository.delete(member);
    }

    @Transactional
    public TripMemberDto updateMemberRole(Long tripId, Long memberId, MemberRole role) {
        User currentUser = authService.getCurrentUser();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        tripService.validateOwnerOnlyPermission(trip, currentUser);

        TripMember member = tripMemberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        if (member.getRole() == MemberRole.OWNER) {
            throw new RuntimeException("Cannot change role of the trip OWNER");
        }

        member.setRole(role);
        TripMember updated = tripMemberRepository.save(member);
        return mapToDto(updated);
    }

    private TripMemberDto mapToDto(TripMember m) {
        String dest = tripRepository.findById(m.getTripId()).map(Trip::getDestination).orElse("Unknown Trip");
        return TripMemberDto.builder()
                .id(m.getId())
                .tripId(m.getTripId())
                .tripDestination(dest)
                .userId(m.getUserId())
                .userEmail(m.getUserEmail())
                .userName(m.getUserName())
                .role(m.getRole())
                .status(m.getStatus())
                .joinedAt(m.getJoinedAt())
                .build();
    }
}
