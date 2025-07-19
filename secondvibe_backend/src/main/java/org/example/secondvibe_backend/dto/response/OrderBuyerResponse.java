package org.example.secondvibe_backend.dto.response;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.OrderStatus;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderBuyerResponse {
    String id;
    int idSeller;
    String name_seller;
    String urlImage_seller;
    @Enumerated(EnumType.STRING)
    OrderStatus orderStatus;
    List<OrderDetailBuyerResponse> details;

}
