package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.CartDetailResponse;
import org.example.secondvibe_backend.entity.CartDetail;
import org.example.secondvibe_backend.entity.ProductImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")

public interface CartDetailMapper {
    @Mapping(source = "size.id", target = "size")
    @Mapping(source = "product.name", target = "name")
    @Mapping(source = "product.price", target = "price")
    @Mapping(source = "product.id", target = "idProduct")
    @Mapping(source = "product.images", target = "urlImage",qualifiedByName = "firstImageUrl")
    CartDetailResponse toCartDetailResponse(CartDetail cartDetail);

    @Named("firstImageUrl")
    default String getFirstImageUrl(List<ProductImage> images) {
        if (images != null && !images.isEmpty()) {
            return images.get(0).getUrlImage();
        }
        return null;
    }

}
