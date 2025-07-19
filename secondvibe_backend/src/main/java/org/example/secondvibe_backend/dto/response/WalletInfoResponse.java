package org.example.secondvibe_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WalletInfoResponse {
    private Integer id;
    private Double balance;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String userName;
    private Integer userId;
    private String userType; // "CLIENT" hoặc "ADMINISTRATOR"
} 