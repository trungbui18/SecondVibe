package org.example.secondvibe_backend.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.example.secondvibe_backend.config.EnvConfig;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUntil {

    private final EnvConfig envConfig;

    public JwtUntil(EnvConfig envConfig) {
        this.envConfig = envConfig;
    }

    private SecretKey key() {
        return Keys.hmacShaKeyFor(envConfig.getJWTSecretKey().getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username, String roles,int id) {
        try {
            Instant now = Instant.now();
            return Jwts.builder()
                    .issuer(envConfig.getIssuer())
                    .subject(username)
                    .claim("idUser",id)
                    .claim("role", roles)
                    .issuedAt(Date.from(now))
                    .expiration(Date.from(now.plusSeconds(envConfig.getAccessTokenExpiration())))
                    .signWith(key(), Jwts.SIG.HS256)
                    .compact();
        } catch (Exception e) {
            throw new JwtException("Invalid JWT", e);
        }
    }

    public String generateRefreshToken(String username, String roles,int id) {
        try {
            Instant now = Instant.now();
            return Jwts.builder()
                    .issuer(envConfig.getIssuer())
                    .subject(username)
                    .claim("idUser",id)
                    .claim("role", roles)
                    .issuedAt(Date.from(now))
                    .expiration(Date.from(now.plusSeconds(envConfig.getRefreshTokenExpiration())))
                    .signWith(key(), Jwts.SIG.HS256)
                    .compact();
        } catch (Exception e) {
            throw new JwtException("Invalid JWT", e);
        }
    }


    public Map<String, Object> parseClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(key())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token has expired");
        } catch (JwtException e) {
            throw new RuntimeException("Invalid token");
        }
    }
}
