package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.AccountStatus;
import org.example.secondvibe_backend.entity.enums.Role;

import java.time.LocalDate;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(unique = true)
    String email;
    String password;
    LocalDate create_at;
    @Enumerated(EnumType.STRING)
    Role role;
    @Enumerated(EnumType.STRING)
    AccountStatus status;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    Client client;
}
