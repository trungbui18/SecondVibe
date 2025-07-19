package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.dto.response.TopProductResponse;
import org.example.secondvibe_backend.dto.response.TopSellerResponse;
import org.example.secondvibe_backend.entity.Order;
import org.example.secondvibe_backend.entity.OrderDetail;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    @Query("""
    SELECT od.product.seller.id AS sellerId,
           od.product.seller.fullName AS name,
           od.product.seller.avatar AS avt,
           COUNT(od.order.id) AS orderCount
    FROM OrderDetail od
    WHERE od.order.orderStatus = 'COMPLETED' or od.order.orderStatus = 'PAID_TO_SELLER'
    GROUP BY od.product.seller.id, od.product.seller.fullName
    ORDER BY COUNT(od.order.id) DESC
""")
    List<TopSellerResponse> findTopSellersByOrderCount(Pageable pageable);

    @Query("SELECT od.product AS product, COUNT(od.product) AS orderCount " +
            "FROM OrderDetail od " +
            "GROUP BY od.product " +
            "ORDER BY orderCount DESC")
    List<Object[]> findTopProductsByOrderCount();


}
