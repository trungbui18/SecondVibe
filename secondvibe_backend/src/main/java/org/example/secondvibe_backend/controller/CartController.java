package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.request.CartCreateRequest;
import org.example.secondvibe_backend.dto.response.CartResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.CartService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/create")
    public ApiResponse<CartResponse> createCart(@RequestBody CartCreateRequest cartCreateRequest) {
        CartResponse cartResponse = cartService.addToCart(cartCreateRequest);
        return ApiResponseBuilder.success("Create cart successfully !", cartResponse);
    }
}
