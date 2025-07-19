package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "rating")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "score", nullable = false)
    private Integer score;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // Client đánh giá (người mua)
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "rater_id", nullable = false)
    private Client rater;

    // Client được đánh giá (người bán)
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "rated_user_id", nullable = false)
    private Client ratedUser;

    // Sản phẩm được đánh giá
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "orderdetail_id")
    OrderDetail orderDetail;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
} 