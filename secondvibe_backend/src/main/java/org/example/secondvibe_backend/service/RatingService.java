package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.request.CreateRatingRequest;
import org.example.secondvibe_backend.dto.response.RatingResponse;
import org.example.secondvibe_backend.entity.Client;
import org.example.secondvibe_backend.entity.OrderDetail;
import org.example.secondvibe_backend.entity.Product;
import org.example.secondvibe_backend.entity.Rating;
import org.example.secondvibe_backend.exception.BadRequestException;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.mapper.RatingMapper;
import org.example.secondvibe_backend.repository.ClientRepository;
import org.example.secondvibe_backend.repository.OrderDetailRepository;
import org.example.secondvibe_backend.repository.ProductRepository;
import org.example.secondvibe_backend.repository.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {
    
    private final RatingRepository ratingRepository;
    private final RatingMapper ratingMapper;
    private final ClientRepository clientRepository;
    private final ProductRepository productRepository;
    private final OrderDetailRepository orderDetailRepository;
    
    public RatingService(RatingRepository ratingRepository, RatingMapper ratingMapper,
                         ClientRepository clientRepository, ProductRepository productRepository, OrderDetailRepository orderDetailRepository) {
        this.ratingRepository = ratingRepository;
        this.ratingMapper = ratingMapper;
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.orderDetailRepository = orderDetailRepository;
    }
    
    public void createRating(Integer raterId, CreateRatingRequest request) {
        // Validate score range (1-5)
        if (request.getScore() < 1 || request.getScore() > 5) {
            throw new BadRequestException("Score must be between 1 and 5");
        }
        
//        // Check if user has already rated this product
//        List<Rating> existingRatings = ratingRepository.findByRater_IdAndProduct_Id(raterId, request.getProductId());
//        if (!existingRatings.isEmpty()) {
//            throw new BadRequestException("You have already rated this product");
//        }
        
        OrderDetail orderDetail = orderDetailRepository.findById(request.getOrderDetailId())
                .orElseThrow(()->new BaseException("not found Order Detail"));

        Client rater = clientRepository.findById(raterId)
                .orElseThrow(() -> new BadRequestException("Rater not found"));
        
        Client ratedUser = clientRepository.findById(request.getRatedUserId())
                .orElseThrow(() -> new BadRequestException("Rated user not found"));
        
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new BadRequestException("Product not found"));
        
        // Validate that the product belongs to the rated user
//        if (product.getSeller().getId() != request.getRatedUserId()) {
//            throw new BadRequestException("Product does not belong to the rated user");
//        }

        Rating rating = new Rating();
        rating.setRater(rater);
        rating.setRatedUser(ratedUser);
        rating.setProduct(product);
        rating.setScore(request.getScore());
        rating.setComment(request.getComment());
        rating.setOrderDetail(orderDetail);

        orderDetail.setRating(rating);
        orderDetail.setCanRate(false);
        orderDetailRepository.save(orderDetail);

    }
    
    public List<RatingResponse> getRatingsReceivedByUser(Integer userId) {
        List<Rating> ratings = ratingRepository.findByRatedUser_Id(userId);
        return ratings.stream()
                .map(ratingMapper::toResponse)
                .collect(Collectors.toList());
    }
} 