package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.DealMethod;
import org.example.secondvibe_backend.entity.enums.PaymentMethod;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    LocalDateTime time_start;
    LocalDateTime time_end;
    String shippingAddress;
    String fullName;
    String phone;
    double totalAmount;

    @Enumerated(EnumType.STRING)
    DealMethod dealMethod;

    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;


    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "client_id")
    Client client;

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<ReservationItem> reservationItems;


    @PrePersist
    public void prePersist() {
        if(time_start == null){
            time_start = LocalDateTime.now();
        }
        if(time_end == null){
            time_end=time_start.plusMinutes(15);
        }
    }
}
