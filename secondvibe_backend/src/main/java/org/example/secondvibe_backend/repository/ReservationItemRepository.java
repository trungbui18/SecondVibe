package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Reservation;
import org.example.secondvibe_backend.entity.ReservationItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationItemRepository extends JpaRepository<ReservationItem, String> {

    @Query("SELECT r FROM ReservationItem r WHERE r.reservation.id = :reservationId")
    List<ReservationItem> findByReservationId(@Param("reservationId") String reservationId);

    @Query("SELECT SUM(ri.quantity) FROM ReservationItem ri WHERE ri.product.id = :productId AND ri.size.id = :sizeId")
    Integer getTotalQuantityByProductId(@Param("productId") int productId, @Param("sizeId") String sizeId);

}


