package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.request.ProductSizeRequest;
import org.example.secondvibe_backend.entity.ProductSize;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")

public interface ProductSizeMapper {
    @Mapping(source = "size.id", target = "sizeId")
    ProductSizeRequest toDto(ProductSize entity);

    @Mapping(source = "sizeId", target = "size.id")
    ProductSize toEntity(ProductSizeRequest dto);

    List<ProductSizeRequest> toDtoList(List<ProductSize> entities);
    List<ProductSize> toEntityList(List<ProductSizeRequest> dtos);
}
