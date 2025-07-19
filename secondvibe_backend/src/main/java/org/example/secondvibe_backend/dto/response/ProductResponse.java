package org.example.secondvibe_backend.dto.response;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.dto.request.ProductSizeRequest;
import org.example.secondvibe_backend.entity.enums.ProductStatus;

import java.util.ArrayList;
import java.util.List;
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    int id;
    String name;
    String description;
    @Enumerated(EnumType.STRING)
    ProductStatus status;
    double price;
    int seller;
    String sellerName;
    String imageSeller;
    String condition;
    String brand;
    String subCategory;
    String category;
    String sdt;
    List<ProductSizeRequest> productSizes=new ArrayList<>();
    List<ProductImageResponse> images=new ArrayList<>();
//    List<SizeQuantityResponse> sizeQuantities=new ArrayList<>();
}
