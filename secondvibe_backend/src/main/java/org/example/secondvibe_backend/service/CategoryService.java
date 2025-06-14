package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.response.CategoryResponse;
import org.example.secondvibe_backend.entity.Category;
import org.example.secondvibe_backend.mapper.CategoryMapper;
import org.example.secondvibe_backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryResponse> categoriesResponse = categories.stream().map(categoryMapper::toCategoryResponse).toList();
        return categoriesResponse;
    }
}
