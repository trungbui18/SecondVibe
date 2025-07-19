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
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AllProductRejectedResponse {
    int id;
    String name;
    String rejectionReason;
    double price;
    @Enumerated(EnumType.STRING)
    ProductStatus status;
    List<ProductImageResponse> images=new ArrayList<>();
}
