package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String fullName;
    String sdt;
    String address;
    LocalDate birthday;
    String avatar;

    @OneToOne
    @JoinColumn(name = "account_id",unique = true)
    @JsonBackReference
    Account account;

    @OneToMany(mappedBy = "seller",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    List<Product> products;
}
