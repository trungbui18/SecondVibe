package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Bank {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    
    String bankName;
    String accountNumber;
    String accountHolderName;
    String branch;
    
    @OneToOne
    @JoinColumn(name = "client_id", unique = true)
    @JsonBackReference
    Client client;
} 

