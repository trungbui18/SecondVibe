package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.response.SubCategoryResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.SubCategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/subcategory")
public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    public SubCategoryController(SubCategoryService subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    @GetMapping("/get_all")
    public ApiResponse<List<SubCategoryResponse>> getAllSubCategories() {
        List<SubCategoryResponse> subCategories = subCategoryService.getAllSubCategories();
        return ApiResponseBuilder.success("Get all subcategory successfully !",subCategories);
    }
}
