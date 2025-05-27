package org.example.secondvibe_backend.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiResponse<T> {
    int status;
    String message;
    T data;
    LocalDateTime timestamp;
}
