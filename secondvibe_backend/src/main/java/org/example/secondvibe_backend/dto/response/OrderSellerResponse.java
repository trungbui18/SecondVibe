package org.example.secondvibe_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.Client;
import org.example.secondvibe_backend.entity.OrderDetail;
import org.example.secondvibe_backend.entity.Payment;
import org.example.secondvibe_backend.entity.enums.DealMethod;
import org.example.secondvibe_backend.entity.enums.OrderStatus;
import org.example.secondvibe_backend.entity.enums.PaymentMethod;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderSellerResponse {
    String id;
    String shippingAddress;
    double totalAmount;
    @Enumerated(EnumType.STRING)
    DealMethod dealMethod;
    LocalDate createdAt;
    LocalDate receivedDate;
    LocalDate shippedDate;

    @Enumerated(EnumType.STRING)
    OrderStatus orderStatus;
    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;
    String fullName;
    String phone;
    List<OrderDetailSellerResponse> orderDetails;

}
