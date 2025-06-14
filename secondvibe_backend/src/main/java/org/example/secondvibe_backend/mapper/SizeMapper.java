package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.SizeResponse;
import org.example.secondvibe_backend.entity.Size;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SizeMapper {
    Size toSize(SizeResponse sizeResponse);
    SizeResponse toSizeResponse(Size size);
}
