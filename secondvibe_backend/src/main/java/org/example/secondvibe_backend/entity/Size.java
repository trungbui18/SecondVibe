package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class Size {
    @Id
    String id;
    String description;

    @OneToMany(mappedBy = "size",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<ProductSize> productSizes=new ArrayList<>();

    @OneToMany(mappedBy = "size",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<CartDetail> cartDetails=new ArrayList<>();

    @OneToMany(mappedBy = "size",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<ReservationItem> reservationItems=new ArrayList<>();
}
