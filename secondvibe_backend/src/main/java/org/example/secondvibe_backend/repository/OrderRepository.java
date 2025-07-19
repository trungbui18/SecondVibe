package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Order;
import org.example.secondvibe_backend.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findAllByOrderStatus(OrderStatus orderStatus);

    @Query("""
    SELECT COUNT(*) 
    FROM Order o 
    WHERE o.orderStatus IN :statuses 
      AND o.receivedDate BETWEEN :start AND :end
""")
    int countByStatusesAndReceivedDateBetween(@Param("statuses") List<OrderStatus> statuses,
                                              @Param("start") LocalDate start,
                                              @Param("end") LocalDate end);


    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.receivedDate=:date and o.orderStatus=:status or o.orderStatus=:status2")
    Double  getRevenue(@Param("date") LocalDate date,
                      @Param("status") OrderStatus status,
                       @Param("status2") OrderStatus status2);

   List<Order> findAllBySeller_Id(Integer sellerId);
   List<Order> findAllByClient_Id(Integer buyerId);

   @Query("SELECT COUNT(o) FROM Order o WHERE o.orderStatus = :status ")
   Long countByOrderStatus(@Param("status") OrderStatus status);

   List<Order> findTop5BySeller_IdOrderByCreatedAtDesc(Integer sellerId);

}
