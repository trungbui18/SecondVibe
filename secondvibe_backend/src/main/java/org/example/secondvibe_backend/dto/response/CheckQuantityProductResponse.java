package org.example.secondvibe_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CheckQuantityProductResponse {
    boolean enough;
    String message;
    int stock;
}
