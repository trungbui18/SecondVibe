package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.BrandResponse;
import org.example.secondvibe_backend.entity.Brand;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BrandMapper {
    Brand toBrand(BrandResponse brandResponse);
    BrandResponse toBrandResponse(Brand brand);
}
