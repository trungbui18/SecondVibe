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
public class LoginGoogleRequest {
    @NotBlank(message = "Dang nhap voi Google that bai")
    String idToken;

    @NotBlank(message = "Khong duoc de trong SDT")
    @Size(min = 10,message = "SDT it nhat 10 ky tu")
    String sdt;

    @NotBlank(message = "Dia chi ko duoc de trong")
    String address;

    @NotNull(message = "Ngày sinh không được để trống")
    @Past(message = "Ngay sinh ko hop le")
    LocalDate birthday;
}
