package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.secondvibe_backend.entity.enums.DealMethod;
import org.example.secondvibe_backend.entity.enums.OrderStatus;
import org.example.secondvibe_backend.entity.enums.PaymentMethod;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String shippingAddress;
    double totalAmount;
    @Enumerated(EnumType.STRING)
    DealMethod dealMethod;

    LocalDate createdAt;
    LocalDate receivedDate;
    LocalDate shippedDate;

    @Enumerated(EnumType.STRING)
    OrderStatus orderStatus;
    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;
    String fullName;
    String phone;

    @OneToOne(mappedBy = "order",cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonManagedReference
    Payment payment;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "client_id")
    Client client;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "seller_id")
    Client seller;



    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    List<OrderDetail> orderDetails=new ArrayList<>();

    // 1-N relationship với WalletTransaction
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    List<WalletTransaction> walletTransactions = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDate.now();
        if (this.orderStatus == null) {
            this.orderStatus = OrderStatus.PENDING;
        }
    }
}
