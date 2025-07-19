package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    // Kiểm tra xem user đã rating sản phẩm này chưa
    @Query("SELECT r FROM Rating r WHERE r.rater.id = :raterId AND r.product.id = :productId")
    List<Rating> findByRater_IdAndProduct_Id(@Param("raterId") Integer raterId, @Param("productId") Integer productId);
    
    // Lấy tất cả rating mà một người nhận được từ người khác
    @Query("SELECT r FROM Rating r JOIN FETCH r.rater JOIN FETCH r.ratedUser JOIN FETCH r.product LEFT JOIN FETCH r.product.images WHERE r.ratedUser.id = :ratedUserId")
    List<Rating> findByRatedUser_Id(@Param("ratedUserId") Integer ratedUserId);
} 