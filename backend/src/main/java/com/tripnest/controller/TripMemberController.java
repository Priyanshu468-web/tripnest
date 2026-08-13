package com.tripnest.controller;

import com.tripnest.dto.MemberInviteDto;
import com.tripnest.dto.TripMemberDto;
import com.tripnest.entity.enums.MemberRole;
import com.tripnest.service.TripMemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class TripMemberController {

    private final TripMemberService tripMemberService;

    @Autowired
    public TripMemberController(TripMemberService tripMemberService) {
        this.tripMemberService = tripMemberService;
    }

    @PostMapping("/api/trips/{tripId}/members/invite")
    public ResponseEntity<TripMemberDto> inviteUser(@PathVariable Long tripId, @Valid @RequestBody MemberInviteDto inviteDto) {
        return ResponseEntity.ok(tripMemberService.inviteUser(tripId, inviteDto));
    }

    @GetMapping("/api/trips/{tripId}/members")
    public ResponseEntity<List<TripMemberDto>> getMembersByTrip(@PathVariable Long tripId) {
        return ResponseEntity.ok(tripMemberService.getMembersByTrip(tripId));
    }

    @GetMapping("/api/members/invitations")
    public ResponseEntity<List<TripMemberDto>> getMyInvitations() {
        return ResponseEntity.ok(tripMemberService.getMyInvitations());
    }

    @PutMapping("/api/members/invitations/{id}/accept")
    public ResponseEntity<TripMemberDto> acceptInvitation(@PathVariable Long id) {
        return ResponseEntity.ok(tripMemberService.respondToInvitation(id, true));
    }

    @PutMapping("/api/members/invitations/{id}/reject")
    public ResponseEntity<TripMemberDto> rejectInvitation(@PathVariable Long id) {
        return ResponseEntity.ok(tripMemberService.respondToInvitation(id, false));
    }

    @DeleteMapping("/api/trips/{tripId}/members/{id}")
    public ResponseEntity<?> removeMember(@PathVariable Long tripId, @PathVariable Long id) {
        tripMemberService.removeMember(tripId, id);
        return ResponseEntity.ok().body("{\"message\": \"Member removed successfully\"}");
    }

    @PutMapping("/api/trips/{tripId}/members/{id}/role")
    public ResponseEntity<TripMemberDto> updateMemberRole(@PathVariable Long tripId, @PathVariable Long id, @RequestParam MemberRole role) {
        return ResponseEntity.ok(tripMemberService.updateMemberRole(tripId, id, role));
    }
}
