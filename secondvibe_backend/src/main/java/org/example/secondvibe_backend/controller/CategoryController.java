package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.response.CategoryResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/get_all")
    public ApiResponse<List<CategoryResponse>> getAll(){
        List<CategoryResponse> ds=categoryService.getAllCategories();
        return ApiResponseBuilder.success("Get all categories successfully !", ds);
    }
}
