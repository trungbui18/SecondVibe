package org.example.secondvibe_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ClientDetailResponse {
    // Thông tin Client
    int id;
    String fullName;
    String sdt;
    String address;
    LocalDate birthday;
    String avatar;
    double amount;
    String joined;

    // Thông tin Account
    String email;

    // Thông tin Bank
    String bankName;
    String accountNumber;
    String accountHolderName;
    String branch;
} 