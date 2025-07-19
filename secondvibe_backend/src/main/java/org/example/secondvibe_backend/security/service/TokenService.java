package org.example.secondvibe_backend.security.service;

import jakarta.servlet.http.HttpServletRequest;
import org.example.secondvibe_backend.security.jwt.JwtUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class TokenService {

    @Autowired
    private JwtUntil jwtUntil;

    public Integer getUserIdFromToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Authorization header missing or invalid");
        }

        String token = authHeader.substring(7);
        Map<String, Object> claims = jwtUntil.parseClaims(token);

        return (Integer) claims.get("idUser");
    }
}

