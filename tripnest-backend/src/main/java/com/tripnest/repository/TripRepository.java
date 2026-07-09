package com.tripnest.repository;

import com.tripnest.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    
    @Query("SELECT t FROM Trip t JOIN t.members m WHERE m.user.email = :email ORDER BY t.startDate ASC")
    List<Trip> findByMemberEmail(@Param("email") String email);
}
