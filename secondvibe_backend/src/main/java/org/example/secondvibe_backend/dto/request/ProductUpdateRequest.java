package org.example.secondvibe_backend.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductUpdateRequest {
    String name;
    String description;
    @Enumerated(EnumType.STRING)
    ProductStatus status;
    double price;
    int seller;
    String condition;
    String brand;
    String subCategory;
    List<ProductSizeRequest> productSizes=new ArrayList<>();
}
