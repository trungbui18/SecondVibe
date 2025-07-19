package org.example.secondvibe_backend.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.example.secondvibe_backend.config.EnvConfig;
import org.example.secondvibe_backend.dto.request.LoginGoogleRequest;
import org.example.secondvibe_backend.dto.request.LoginRequest;
import org.example.secondvibe_backend.dto.request.RegisterRequest;
import org.example.secondvibe_backend.dto.response.LoginResponse;
import org.example.secondvibe_backend.entity.Account;
import org.example.secondvibe_backend.entity.Client;
import org.example.secondvibe_backend.entity.Wallet;
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
import java.util.Collections;

@Service
public class AuthService {
    private final AccountRepository accountRepository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final EnvConfig envConfig;
    private final JwtUntil jwtUntil;
    public AuthService(AccountRepository accountRepository, ClientRepository clientRepository, PasswordEncoder passwordEncoder, EnvConfig envConfig, JwtUntil jwtUntil) {
        this.accountRepository = accountRepository;
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
        this.envConfig = envConfig;
        this.jwtUntil = jwtUntil;
    }

    public boolean checkExistsEmail(String email){
        if(accountRepository.existsAccountByEmail(email)){
            return false;
        }
        return true;
    }

    public LoginResponse register(RegisterRequest request) {
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
        account.setCreate_at(today);
        account.setStatus(AccountStatus.ACTIVE);
        accountRepository.save(account);

        Client client = new Client();
        client.setAccount(account);
        client.setSdt(request.getSdt());
        client.setAddress(request.getAddress());
        client.setAvatar("https://secondvibe.s3.ap-southeast-2.amazonaws.com/anonymous.jpg");
        client.setFullName(request.getFullName());
        client.setBirthday(request.getBirthday());
        account.setClient(client);


        Wallet wallet=new Wallet();
        wallet.setBalance(0.0);
        wallet.setClient(account.getClient());


        client.setWallet(wallet);
        clientRepository.save(client);


        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setId(account.getClient().getId());
        loginResponse.setEmail(account.getEmail());
        loginResponse.setFullName(client.getFullName());
        loginResponse.setRole(account.getRole());
        loginResponse.setAvatar(account.getClient().getAvatar());

        String role=account.getRole().toString();
        String accessToken=jwtUntil.generateToken(account.getEmail(),role,client.getId());
        String refreshToken=jwtUntil.generateRefreshToken(account.getEmail(),role,client.getId());
        loginResponse.setAccessToken(accessToken);
        loginResponse.setRefreshToken(refreshToken);

        return loginResponse;
    }
    public LoginResponse login(LoginRequest request) {
        Account account=accountRepository.findByEmail(request.getEmail()).orElseThrow(()->new UnauthorizedException("Khong tim thay account"));
        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new UnauthorizedException("Sai mat khau");
        }
        Role role = account.getRole();
        int idUser=account.getClient().getId();
        String name=account.getClient().getFullName();
        String email=account.getEmail();
        String avatar=account.getClient().getAvatar();
        String accessToken=jwtUntil.generateToken(request.getEmail(), role.toString(),idUser);
        String refreshToken=jwtUntil.generateRefreshToken(request.getEmail(),role.toString(),idUser);
        AccountStatus accountStatus=account.getStatus();
        return new LoginResponse(idUser,name,email,avatar,role,accountStatus,accessToken,refreshToken);
    }

    public LoginResponse loginWithGoogle(LoginGoogleRequest request) {
        String idTokenString = request.getIdToken();

        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier
                    .Builder(new NetHttpTransport(), new JacksonFactory())
                    .setAudience(Collections.singletonList(envConfig.getClientId()))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                if(accountRepository.existsAccountByEmail(email)) {
                    Account account=accountRepository.findByEmail(email).orElseThrow(()->new BaseException("Khong tim thay account"));
                    Role role = account.getRole();
                    int idUser=account.getClient().getId();
                    AccountStatus status=account.getStatus();
                    String accessToken=jwtUntil.generateToken(email, role.toString(),idUser);
                    String refreshToken=jwtUntil.generateRefreshToken(email,role.toString(),idUser);
                    return new LoginResponse(idUser,name,email,pictureUrl,role,status,accessToken,refreshToken);
                }
                LocalDate today = LocalDate.now();
                int age = today.getYear() - request.getBirthday().getYear();
                if (age < 16) {
                    throw new BadRequestException("Age must be at least 16");
                }

                Account account = new Account();
                account.setEmail(email);
                account.setRole(Role.CLIENT);
                account.setCreate_at(today);
                account.setStatus(AccountStatus.ACTIVE);
                accountRepository.save(account);

                Client client = new Client();
                client.setAccount(account);
                client.setSdt(request.getSdt());
                client.setAddress(request.getAddress());
                client.setFullName(name);

                client.setAvatar(pictureUrl);
                client.setBirthday(request.getBirthday());
                account.setClient(client);

                Wallet wallet=new Wallet();
                wallet.setBalance(0.0);
                wallet.setClient(account.getClient());
                client.setWallet(wallet);
                clientRepository.save(client);



                LoginResponse loginResponse = new LoginResponse();
                loginResponse.setId(account.getClient().getId());
                loginResponse.setEmail(account.getEmail());
                loginResponse.setAvatar(pictureUrl);
                loginResponse.setFullName(client.getFullName());
                loginResponse.setRole(account.getRole());
                loginResponse.setStatus(account.getStatus());

                String role=account.getRole().toString();
                String accessToken=jwtUntil.generateToken(account.getEmail(),role,client.getId());
                String refreshToken=jwtUntil.generateRefreshToken(account.getEmail(),role,client.getId());

                loginResponse.setAccessToken(accessToken);
                loginResponse.setRefreshToken(refreshToken);

                return loginResponse;
            } else {
                throw new BadRequestException("Mã Token Google bị sai");
            }

        } catch (Exception e) {
            throw new BadRequestException("Có lỗi khi đăng nhập với Google ");
        }
    }
}

