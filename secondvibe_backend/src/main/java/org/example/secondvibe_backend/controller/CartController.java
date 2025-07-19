package org.example.secondvibe_backend.controller;

import jakarta.validation.Valid;
import org.example.secondvibe_backend.dto.request.CartCreateRequest;
import org.example.secondvibe_backend.dto.response.CartResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.CartService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/create")
    public ApiResponse<CartResponse> createCart( @RequestBody CartCreateRequest cartCreateRequest) {
        try {
            CartResponse cartResponse = cartService.addToCart(cartCreateRequest);
            return ApiResponseBuilder.success("Create cart successfully !", cartResponse);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/get_by_idClient")
    public ApiResponse<CartResponse> getCartByIcClient( Authentication authentication) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            int idUser = ((Long)jwt.getClaim("idUser")).intValue();
            CartResponse cartResponse = cartService.getCartByIdUser(idUser);
            return ApiResponseBuilder.success("Get cart successfully !",cartResponse);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
