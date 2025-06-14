package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.SubCategoryResponse;
import org.example.secondvibe_backend.entity.Category;
import org.example.secondvibe_backend.entity.SubCategory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface SubCategoryMapper {
    SubCategory toSubCategory(SubCategoryResponse subCategoryResponse);
    SubCategoryResponse toSubCategoryResponse(SubCategory subCategory);
}
