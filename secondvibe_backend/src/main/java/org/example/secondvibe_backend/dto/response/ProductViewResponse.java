package org.example.secondvibe_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.*;
import org.example.secondvibe_backend.entity.enums.ProductStatus;

import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductViewResponse {
    int id;
    String name;
    String description;
    double price;
    LocalDate createdAt;
    @Enumerated(EnumType.STRING)
    ProductStatus status;
    int seller;
    String sellerName;
    String imageSeller;
    String condition;
    String brand;
    String subCategory;
    String category;
    String img;
}
