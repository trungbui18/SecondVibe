package org.example.secondvibe_backend.dto.response;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.DealMethod;
import org.example.secondvibe_backend.entity.enums.PaymentMethod;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    String id;
    String shippingAddress;
    double totalAmount;

    @Enumerated(EnumType.STRING)
    DealMethod dealMethod;

    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;

    String fullName;
    String phone;
    int idClient;
    List<OrderDetailSellerResponse> orderDetailSellerResponses;
}
