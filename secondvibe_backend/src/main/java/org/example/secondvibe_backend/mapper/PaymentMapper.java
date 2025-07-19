package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.request.PaymentRequest;
import org.example.secondvibe_backend.entity.Payment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface PaymentMapper {
    Payment toPayment(PaymentRequest paymentRequest);
}
