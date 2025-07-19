package org.example.secondvibe_backend.dto.request;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.OrderDetail;
import org.example.secondvibe_backend.entity.enums.DealMethod;
import org.example.secondvibe_backend.entity.enums.PaymentMethod;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderRequest {
    String shippingAddress;
    String fullName;
    String phone;
    int totalAmount;

    @Enumerated(EnumType.STRING)
    DealMethod dealMethod;

    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;
    List<OrderDetailRequest> orderDetails;
}
