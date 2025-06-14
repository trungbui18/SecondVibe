package org.example.secondvibe_backend.dto.request;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.*;
import org.example.secondvibe_backend.entity.enums.ProductStatus;

import java.util.ArrayList;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreateRequest {
    String name;
    String description;
    double price;
    int seller;
    int condition;
    int brand;
    int subCategory;
    List<ProductSizeRequest> productSizes=new ArrayList<>();
}
