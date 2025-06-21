package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.CartResponse;
import org.example.secondvibe_backend.entity.Cart;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface CartMapper {
    Cart toCart(CartResponse cartResponse);
    CartResponse toCartResponse(Cart cart);
}
