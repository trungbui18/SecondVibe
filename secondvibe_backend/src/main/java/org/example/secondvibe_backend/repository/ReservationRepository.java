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

//    @Query("SELECT SUM(r.quantity) FROM Reservation r WHERE r.product.id = :productId and r.size.id=:sizeId")
//    int getTotalQuantityByProductId(@Param("productId") int productId , String sizeId);
}

