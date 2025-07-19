package org.example.secondvibe_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.secondvibe_backend.entity.enums.TransactionStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WithdrawResponse {
    private String transactionId;
    private Double amount;
    private TransactionStatus status;
    private String description;
    private LocalDateTime createdAt;
    private Double remainingBalance;
} 