package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)

public class ProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    int quantity;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "size_id")
    Size size;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "product_id")
    Product product;

    public void setId(int id) {
        this.id = id;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public Size getSize() {
        return size;
    }

    public Product getProduct() {
        return product;
    }

    public ProductSize(int id, int quantity, Size size, Product product) {
        this.id = id;
        this.quantity = quantity;
        this.size = size;
        this.product = product;
    }

    public ProductSize() {
    }

    @Override
    public String toString() {
        return "ProductSize{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", sizeId=" + (size != null ? size.getId() : null) +
                ", productId=" + (product != null ? product.getId() : null) +
                '}';
    }

}
