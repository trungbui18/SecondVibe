package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {

    @Query(value = "SELECT * FROM reservation WHERE MINUTE(time_end) = :minute", nativeQuery = true)
    List<Reservation> findByEndMinute(@Param("minute") int minute);

    @Query("SELECT r FROM Reservation r LEFT JOIN FETCH r.reservationItems WHERE r.id = :id")
    Optional<Reservation> findWithItems(@Param("id") String id);



}

