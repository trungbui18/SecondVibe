package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.RatingResponse;
import org.example.secondvibe_backend.entity.Rating;
import org.springframework.stereotype.Component;

@Component
public class RatingMapper {
    
    public RatingResponse toResponse(Rating rating) {
        if (rating == null) {
            return null;
        }
        
        // Lấy hình ảnh đầu tiên của sản phẩm
        String productFirstImage = null;
        if (rating.getProduct().getImages() != null && !rating.getProduct().getImages().isEmpty()) {
            productFirstImage = rating.getProduct().getImages().get(0).getUrlImage();
        }
        
        return new RatingResponse(
            rating.getId(),
            rating.getRater().getId(),
            rating.getRater().getFullName(),
            rating.getRater().getAvatar(),
            rating.getRatedUser().getId(),
            rating.getRatedUser().getFullName(),
            rating.getRatedUser().getAvatar(),
            rating.getProduct().getId(),
            rating.getProduct().getName(),
            productFirstImage,
            rating.getScore(),
            rating.getComment(),
            rating.getCreatedAt()
        );
    }
} 