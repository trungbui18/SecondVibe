package org.example.secondvibe_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingResponse {
    private Integer id;
    private Integer raterId;
    private String raterName;
    private String raterAvatar;
    private Integer ratedUserId;
    private String ratedUserName;
    private String ratedUserAvatar;
    private Integer productId;
    private String productName;
    private String productFirstImage;
    private Integer score;
    private String comment;
    private LocalDateTime createdAt;
}