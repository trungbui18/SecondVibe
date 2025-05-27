package org.example.secondvibe_backend.security.service;

import org.example.secondvibe_backend.entity.Account;
import org.example.secondvibe_backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account account = accountRepository.findByEmail(email).orElseThrow(()->new RuntimeException("ko tim thay email"));
        return User.builder()
                .username(account.getEmail())
                .password(account.getPassword())
                .roles("ROLE_" + account.getRole().toString())
                .build();
    }
}
