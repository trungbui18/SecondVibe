package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.request.CreateRatingRequest;
import org.example.secondvibe_backend.dto.response.RatingResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.RatingService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rating")
public class RatingController {
    
    private final RatingService ratingService;
    
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }
    
    @PostMapping("/client/create")
    public ApiResponse<String> createRating(Authentication authentication, 
                                           @RequestBody CreateRatingRequest request) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            int raterId = ((Long)jwt.getClaim("idUser")).intValue();

            ratingService.createRating(raterId, request);
            return ApiResponseBuilder.success("Rating created successfully", "OK");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    @GetMapping("/public/get_ratings_received/{userId}")
    public ApiResponse<List<RatingResponse>> getRatingsReceivedByUser(@PathVariable Integer userId) {
        List<RatingResponse> ratings = ratingService.getRatingsReceivedByUser(userId);
        return ApiResponseBuilder.success("Get ratings received by user", ratings);
    }
} 