package org.example.secondvibe_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateClientResponse {
    
    // Thông tin Client
    private Integer id;
    private String fullName;
    private String sdt;
    private String address;
    private LocalDate birthday;
    private String avatar;
    
    // Thông tin Bank
    private String bankName;
    private String accountNumber;
    private String accountHolderName;
    private String branch;
} 