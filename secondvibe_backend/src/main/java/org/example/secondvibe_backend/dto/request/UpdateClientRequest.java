package org.example.secondvibe_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateClientRequest {
    
    // Thông tin Client
    @NotBlank(message = "Họ tên không được để trống")
    private String fullName;
    
    @NotBlank(message = "Số điện thoại không được để trống")
    private String sdt;
    
    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;
    
    @NotNull(message = "Ngày sinh không được để trống")
    private LocalDate birthday;

    private String bankName;
    private String accountNumber;
    private String accountHolderName;
    private String branch;
} 