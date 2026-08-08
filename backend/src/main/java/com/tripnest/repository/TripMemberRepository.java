package com.tripnest.repository;

import com.tripnest.entity.TripMember;
import com.tripnest.entity.enums.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripMemberRepository extends JpaRepository<TripMember, Long> {
    List<TripMember> findByTripId(Long tripId);
    List<TripMember> findByUserEmail(String userEmail);
    List<TripMember> findByUserEmailAndStatus(String userEmail, MemberStatus status);
    List<TripMember> findByUserIdAndStatus(Long userId, MemberStatus status);
    Optional<TripMember> findByTripIdAndUserEmail(Long tripId, String userEmail);
    Optional<TripMember> findByTripIdAndUserId(Long tripId, Long userId);
}
