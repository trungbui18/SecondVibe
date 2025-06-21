package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.ProductStatus;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    String description;
    double price;

    @Enumerated(EnumType.STRING)
    ProductStatus status=ProductStatus.PENDING_APPROVAL;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<ProductImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<ProductSize> productSizes=new ArrayList<>();

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<ReservationItem> reservationItem;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<CartDetail> cartDetails=new ArrayList<>();

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="seller_id",nullable=false)
    Client seller;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "condition_id",nullable = false)
    Condition condition;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "brand_id",nullable = false)
    Brand brand;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "subcategory_id",nullable = false)
    SubCategory subCategory;



}
