package com.tripnest.repository;

import com.tripnest.entity.Trip;
import com.tripnest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByOwnerId(Long ownerId);

    @Query("SELECT DISTINCT t FROM Trip t LEFT JOIN TripMember tm ON t.id = tm.tripId " +
           "WHERE t.owner.id = :userId OR (tm.userId = :userId AND tm.status = 'ACCEPTED')")
    List<Trip> findAllAccessibleTripsForUser(Long userId);
}
