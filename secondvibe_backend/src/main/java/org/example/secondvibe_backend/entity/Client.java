package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String fullName;
    String sdt;
    String address;
    LocalDate birthday;
    String avatar;
    double amount;

    @OneToOne
    @JoinColumn(name = "account_id",unique = true)
    @JsonBackReference
    Account account;

    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    Cart cart;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<Order> orders;

    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<Order> ordersOfSeller;

    @OneToMany(mappedBy = "seller",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    List<Product> products=new ArrayList<>();

    @OneToMany(mappedBy = "client",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    List<Reservation> reservations;

    // 1-1 relationship với Wallet
    @OneToOne(mappedBy = "client",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    Wallet wallet;

    // 1-1 relationship với Bank
    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    Bank bank;


}
