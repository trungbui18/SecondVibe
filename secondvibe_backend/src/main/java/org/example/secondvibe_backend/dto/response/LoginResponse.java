package org.example.secondvibe_backend.dto.response;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.AccountStatus;
import org.example.secondvibe_backend.entity.enums.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginResponse {
    private int id;
    private String fullName;
    private String email;
    private String avatar;
    private Role role;
    @Enumerated(EnumType.STRING)
    private AccountStatus status;
    private String accessToken;
    private String refreshToken;
}
