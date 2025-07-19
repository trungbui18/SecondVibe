package org.example.secondvibe_backend.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailSellerResponse {
    int id;
    int quantity;
    double price;
    String size;
    String imgUrl;
    String name;
    String description;
}
