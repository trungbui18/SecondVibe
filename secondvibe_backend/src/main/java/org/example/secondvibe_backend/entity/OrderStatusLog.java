package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.OrderStatus;

import java.time.LocalDateTime;

@Data
//@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class OrderStatusLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    LocalDateTime time;
    String note;
    @Enumerated(EnumType.STRING)
    OrderStatus orderStatus;

//    @ManyToOne
//    @JoinColumn(name = "order_id",nullable = false)
//    @JsonBackReference
//    Order order;
}
