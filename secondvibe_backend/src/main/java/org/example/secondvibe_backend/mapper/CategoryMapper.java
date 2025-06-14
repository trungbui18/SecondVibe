package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.CategoryResponse;
import org.example.secondvibe_backend.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",uses = {SubCategoryMapper.class})

public interface CategoryMapper {
    Category toCategory(CategoryResponse categoryResponse);
    CategoryResponse toCategoryResponse(Category category);
}
