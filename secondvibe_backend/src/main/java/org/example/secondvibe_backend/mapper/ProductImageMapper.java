package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.ProductImageResponse;
import org.example.secondvibe_backend.entity.ProductImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface ProductImageMapper {
    ProductImageResponse productImageToProductImageResponse(ProductImage productImage);
    ProductImage productImageResponseToProductImage(ProductImageResponse productImageResponse);

}
