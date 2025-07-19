package org.example.secondvibe_backend.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final EnvConfig envConfig;
    public AuthController(AuthService authService, EnvConfig envConfig) {
        this.authService = authService;
        this.envConfig = envConfig;
    }

    @PostMapping("/check_email")
    public ApiResponse<Boolean> checkEmail(@RequestParam String email){
        boolean check= authService.checkExistsEmail(email);
        return ApiResponseBuilder.success("Check mail",check);
    }

    @PostMapping("/register")
    public ApiResponse<LoginResponse> register(@Valid @RequestBody RegisterRequest registerRequest,HttpServletResponse response) {
        LoginResponse registerResponse= authService.register(registerRequest);
        Cookie refreshTokenCookie = new Cookie("refreshToken", registerResponse.getRefreshToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(Integer.parseInt(String.valueOf(envConfig.getRefreshTokenExpiration())));

        response.addCookie(refreshTokenCookie);

        registerResponse.setRefreshToken(null);
        return ApiResponseBuilder.success("Create Successfully",registerResponse);
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        LoginResponse loginResponse= authService.login(loginRequest);
        Cookie refreshTokenCookie = new Cookie("refreshToken", loginResponse.getRefreshToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(Integer.parseInt(String.valueOf(envConfig.getRefreshTokenExpiration())));

        response.addCookie(refreshTokenCookie);

        loginResponse.setRefreshToken(null);
        return ApiResponseBuilder.success("Lgoin Successfully",loginResponse);
    }

    @PostMapping("/google")
    public ApiResponse<LoginResponse> loginWithGoogle(@RequestBody LoginGoogleRequest request,HttpServletResponse response) {
        LoginResponse loginResponse= authService.loginWithGoogle(request);
        Cookie refreshTokenCookie = new Cookie("refreshToken", loginResponse.getRefreshToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(Integer.parseInt(String.valueOf(envConfig.getRefreshTokenExpiration())));

        response.addCookie(refreshTokenCookie);

        loginResponse.setRefreshToken(null);
        return ApiResponseBuilder.success("Lgoin Successfully",loginResponse);

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.ok("Logout successful");
    }

}
