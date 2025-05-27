package org.example.secondvibe_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.Role;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterResponse {
    private int id;
    private String fullName;
    private String email;
    private Role role;
    private String accessToken;
    private String refreshToken;
}
