package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "reservation") // thêm dòng này
public class ReservationItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    int quantity;
    double price;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "size_id")
    Size size;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "reservation_id",nullable = false)
    Reservation reservation;
}
