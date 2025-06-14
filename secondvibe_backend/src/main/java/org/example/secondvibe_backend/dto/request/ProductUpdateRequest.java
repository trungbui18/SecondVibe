package org.example.secondvibe_backend.dto.request;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.ProductStatus;

import java.util.ArrayList;
import java.util.List;
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdateRequest {
    String name;
    String description;
    @Enumerated(EnumType.STRING)
    ProductStatus status;
    double price;
    int seller;
    int condition;
    int brand;
    int subCategory;
    List<ProductSizeRequest> productSizes=new ArrayList<>();
}
