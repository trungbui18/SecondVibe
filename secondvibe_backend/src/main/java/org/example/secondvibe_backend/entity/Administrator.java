package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class Administrator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    double revenue;
    String name;
    double commission_rate;
    String phone;

    @OneToOne
    @JoinColumn(name = "account_id",unique = true)
    @JsonBackReference
    Account account;

    @OneToOne(mappedBy = "administrator", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    Wallet wallet;

}
