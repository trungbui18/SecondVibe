package org.example.secondvibe_backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CheckQuantityProductRequest {
    int idProduct;
    int quantity;
    String sizeId;
}
