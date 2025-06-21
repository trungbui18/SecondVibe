package org.example.secondvibe_backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartDetailUpdateRequest {
    int idCartDetail;
    int quantity;
}
