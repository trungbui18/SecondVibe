package org.example.secondvibe_backend.dto.response;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.OrderStatus;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AllOrdersSellerResponse {
    String id;
    double totalAmount;
    LocalDate createdAt;
    @Enumerated(EnumType.STRING)
    OrderStatus orderStatus;

}
