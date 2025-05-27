package org.example.secondvibe_backend.controller;

import jakarta.validation.Valid;
import org.example.secondvibe_backend.dto.request.LoginRequest;
import org.example.secondvibe_backend.dto.request.RegisterRequest;
import org.example.secondvibe_backend.dto.response.LoginResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.dto.response.RegisterResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ApiResponse<RegisterResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        RegisterResponse registerResponse= authService.register(registerRequest);
        return ApiResponseBuilder.success("Create Successfully",registerResponse);
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse= authService.login(loginRequest);
        return ApiResponseBuilder.success("Lgoin Successfully",loginResponse);
    }
}
