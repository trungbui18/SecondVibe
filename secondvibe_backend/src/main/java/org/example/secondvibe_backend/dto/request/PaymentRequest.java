package org.example.secondvibe_backend.dto.request;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.PaymentStatus;

import java.time.LocalDateTime;
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    String idReservation;
    String codePaymet;
    double amount;
    LocalDateTime date;
    @Enumerated(EnumType.STRING)
    PaymentStatus status;
}
