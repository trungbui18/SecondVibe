package org.example.secondvibe_backend.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ApiResponseBuilder {
    public static <T> ApiResponse<T> success(String mess, T data){
        return new ApiResponse<>(200,mess,data, LocalDateTime.now());
    }
    public static <T> ApiResponse<T> error(String mess, T data){
        return new ApiResponse<>(400,mess,null, LocalDateTime.now());
    }
}
