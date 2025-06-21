package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    int quantity;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "cart_id")
    Cart cart;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "size_id")
    Size size;

}
