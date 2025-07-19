package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.*;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    int quantity;
    double price;
    boolean canRate=true;
    @ManyToOne
    @JoinColumn(name = "order_id",nullable = false)
    @JsonBackReference
    Order order;

    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    @JsonBackReference
    Product product;

    @OneToOne(mappedBy = "orderDetail", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    Rating rating;

    @ManyToOne
    @JoinColumn(name = "size_id",nullable = false)
    @JsonBackReference
    Size size;
}

