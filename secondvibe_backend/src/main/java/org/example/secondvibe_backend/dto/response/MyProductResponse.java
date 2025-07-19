package org.example.secondvibe_backend.dto.response;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.ProductStatus;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MyProductResponse {
    int id;
    String name;
    String rejectionReason;
    double price;
    int quantity;
    String img;
    LocalDate createdAt;
    @Enumerated(EnumType.STRING)
    ProductStatus status;
}
