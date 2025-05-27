package org.example.secondvibe_backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    String email;

    @NotBlank(message = "Mat khau khong duoc de trong")
    @Size(min = 8,message = "Mat khau it nhat 8 ky tu")
    String password;

    @NotBlank(message = "Ten ko duoc de trong")
    String fullName;

    @NotBlank(message = "Khong duoc de trong SDT")
    @Size(min = 10,message = "SDT it nhat 10 ky tu")
    String sdt;

    @NotBlank(message = "Dia chi ko duoc de trong")
    String address;

    @NotNull(message = "Ngày sinh không được để trống")
    @Past(message = "Ngay sinh ko hop le")
    LocalDate birthday;
}
