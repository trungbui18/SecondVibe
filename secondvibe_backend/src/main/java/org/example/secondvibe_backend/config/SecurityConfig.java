package org.example.secondvibe_backend.config;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import io.jsonwebtoken.security.Keys;
import org.example.secondvibe_backend.security.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;


import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final EnvConfig envConfig;

    public SecurityConfig(EnvConfig envConfig) {
        this.envConfig = envConfig;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   CustomUserDetailService customUserDetailsService,
                                                   JwtDecoder jwtDecoder) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**","/product/public/**","/brand/public/**","/size/**","/condition/**"
                        ,"/subcategory/public/**","/category/**","/client/public/**","/cart/**","/cart_detail/**"
                        ,"/order/public/**","/checkout/**","/orderdetail/public/**","/rating/**"
                        ,"/wallet/**").permitAll()
                        .requestMatchers("/product/admin/**","/client/admin/**"
                                , "/order/admin/**").hasRole("ADMINISTRATOR")
                        .requestMatchers("/order/client/**").hasRole("CLIENT")
                        .requestMatchers("/orderdetail/client/**").hasRole("CLIENT")
                        .requestMatchers("/client/client/**").hasRole("CLIENT")



                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .decoder(jwtDecoder)
                                .jwtAuthenticationConverter(jwtToken -> {
                                    String role = jwtToken.getClaimAsString("role");
                                    Long idUser = jwtToken.getClaim("idUser");
                                    List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));
                                    return new JwtAuthenticationToken(jwtToken, authorities);
                                })
                        )
                )
                .userDetailsService(customUserDetailsService);

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        if (envConfig.getJWTSecretKey() == null || envConfig.getJWTSecretKey().trim().isEmpty()) {
            throw new IllegalArgumentException("JWT secret cannot be null or empty. Please configure 'jwt.secret' in application.properties.");
        }
        SecretKey key = new SecretKeySpec(envConfig.getJWTSecretKey().getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        return NimbusJwtDecoder.withSecretKey(key).build();
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        SecretKey key = new SecretKeySpec(envConfig.getJWTSecretKey().getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        return new NimbusJwtEncoder(new ImmutableSecret<>(key));
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}