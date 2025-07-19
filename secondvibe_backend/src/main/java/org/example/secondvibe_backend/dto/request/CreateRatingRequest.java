package org.example.secondvibe_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRatingRequest {
    private int ratedUserId;
    private int productId;
    private int orderDetailId;
    private int score;
    private String comment;

} 