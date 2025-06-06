package org.example.secondvibe_backend.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginResponse {
    private int id;
    private String fullName;
    private String email;
    private Role role;
    private String accessToken;
    private String refreshToken;
}
