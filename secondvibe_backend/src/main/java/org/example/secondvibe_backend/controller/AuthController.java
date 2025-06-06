package org.example.secondvibe_backend.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import jakarta.validation.Valid;
import org.example.secondvibe_backend.config.EnvConfig;
import org.example.secondvibe_backend.dto.request.LoginGoogleRequest;
import org.example.secondvibe_backend.dto.request.LoginRequest;
import org.example.secondvibe_backend.dto.request.RegisterRequest;
import org.example.secondvibe_backend.dto.response.LoginResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.dto.response.RegisterResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ApiResponse<LoginResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        LoginResponse registerResponse= authService.register(registerRequest);
        return ApiResponseBuilder.success("Create Successfully",registerResponse);
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse= authService.login(loginRequest);
        return ApiResponseBuilder.success("Lgoin Successfully",loginResponse);
    }

    @PostMapping("/google")
    public ApiResponse<LoginResponse> loginWithGoogle(@RequestBody LoginGoogleRequest request) {
        LoginResponse loginResponse= authService.loginWithGoogle(request);
        return ApiResponseBuilder.success("Lgoin Successfully",loginResponse);

    }
}
