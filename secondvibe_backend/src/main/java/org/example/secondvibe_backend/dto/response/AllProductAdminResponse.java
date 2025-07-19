package org.example.secondvibe_backend.dto.response;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.ProductStatus;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AllProductAdminResponse {
    int id;
    String name;
    @Enumerated(EnumType.STRING)
    ProductStatus status;
    double price;
    String subCategory;
    String category;
    LocalDate createdAt;
}
