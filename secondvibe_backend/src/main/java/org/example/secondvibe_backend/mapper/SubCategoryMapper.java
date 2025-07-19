package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.SubCategoryResponse;
import org.example.secondvibe_backend.entity.Category;
import org.example.secondvibe_backend.entity.SubCategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface SubCategoryMapper {
    SubCategory toSubCategory(SubCategoryResponse subCategoryResponse);

    @Mapping(target  ="category_name", source = "category.name")
    SubCategoryResponse toSubCategoryResponse(SubCategory subCategory);
}
