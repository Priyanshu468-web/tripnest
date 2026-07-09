package com.tripnest.repository;

import com.tripnest.entity.TripMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TripMemberRepository extends JpaRepository<TripMember, Long> {
    Optional<TripMember> findByTripIdAndUserEmail(Long tripId, String email);
    boolean existsByTripIdAndUserEmail(Long tripId, String email);
}
