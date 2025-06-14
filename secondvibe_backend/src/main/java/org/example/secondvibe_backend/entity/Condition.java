package org.example.secondvibe_backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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
@Table(name = "`condition`")
public class Condition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String description;

    @OneToMany(mappedBy = "condition", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<Product> products=new ArrayList<>();


}
