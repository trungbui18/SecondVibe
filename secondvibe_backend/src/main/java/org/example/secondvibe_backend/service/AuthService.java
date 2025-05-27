package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.request.LoginRequest;
import org.example.secondvibe_backend.dto.request.RegisterRequest;
import org.example.secondvibe_backend.dto.response.LoginResponse;
import org.example.secondvibe_backend.dto.response.RegisterResponse;
import org.example.secondvibe_backend.entity.Account;
import org.example.secondvibe_backend.entity.Client;
import org.example.secondvibe_backend.entity.enums.AccountStatus;
import org.example.secondvibe_backend.entity.enums.Role;
import org.example.secondvibe_backend.exception.BadRequestException;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.exception.UnauthorizedException;
import org.example.secondvibe_backend.repository.AccountRepository;
import org.example.secondvibe_backend.repository.ClientRepository;
import org.example.secondvibe_backend.security.jwt.JwtUntil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AuthService {
    private final AccountRepository accountRepository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUntil jwtUntil;
    public AuthService(AccountRepository accountRepository, ClientRepository clientRepository, PasswordEncoder passwordEncoder, JwtUntil jwtUntil) {
        this.accountRepository = accountRepository;
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUntil = jwtUntil;
    }

    public RegisterResponse register(RegisterRequest request) {
        if (accountRepository.existsAccountByEmail(request.getEmail())) {
            throw new BadRequestException("Email is exists");
        }
        LocalDate today = LocalDate.now();
        int age = today.getYear() - request.getBirthday().getYear();
        if (age < 16) {
            throw new BadRequestException("Age must be at least 16");
        }

        Account account = new Account();
        account.setEmail(request.getEmail());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setRole(Role.CLIENT);
        account.setStatus(AccountStatus.ACTIVE);
        accountRepository.save(account);

        Client client = new Client();
        client.setAccount(account);
        client.setSdt(request.getSdt());
        client.setAddress(request.getAddress());
        client.setFullName(request.getFullName());
        client.setBirthday(request.getBirthday());
        clientRepository.save(client);

        account.setClient(client);

        RegisterResponse registerResponse = new RegisterResponse();
        registerResponse.setId(account.getId());
        registerResponse.setEmail(account.getEmail());
        registerResponse.setFullName(client.getFullName());
        registerResponse.setRole(account.getRole());

        String role=account.getRole().toString();
        String accessToken=jwtUntil.generateToken(account.getEmail(),role);
        String refreshToken=jwtUntil.generateRefreshToken(account.getEmail(),role);

        registerResponse.setAccessToken(accessToken);
        registerResponse.setRefreshToken(refreshToken);

        return registerResponse;
    }
    public LoginResponse login(LoginRequest request) {
        Account account=accountRepository.findByEmail(request.getEmail()).orElseThrow(()->new UnauthorizedException("Khong tim thay account"));
        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new UnauthorizedException("Sai mat khau");
        }
        String role = account.getRole().toString();
        String accessToken=jwtUntil.generateToken(request.getEmail(), role);
        String refreshToken=jwtUntil.generateRefreshToken(request.getEmail(),role);
        int idUser=account.getClient().getId();
        return new LoginResponse(accessToken, refreshToken,idUser,role);
    }

}

