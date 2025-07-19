package org.example.secondvibe_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.secondvibe_backend.entity.Product;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopProductResponse {
    private Product product;
    private long orderCount;
} 