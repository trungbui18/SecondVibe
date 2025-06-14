package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.response.SubCategoryResponse;
import org.example.secondvibe_backend.entity.SubCategory;
import org.example.secondvibe_backend.mapper.SubCategoryMapper;
import org.example.secondvibe_backend.repository.SubCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubCategoryService {
    private final SubCategoryRepository subCategoryRepository;
    private final SubCategoryMapper subCategoryMapper;
    public SubCategoryService(SubCategoryRepository subCategoryRepository, SubCategoryMapper subCategoryMapper) {
        this.subCategoryRepository = subCategoryRepository;
        this.subCategoryMapper = subCategoryMapper;
    }

    public List<SubCategoryResponse> getAllSubCategories() {
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        List<SubCategoryResponse> subCategoriesResponse = subCategories.stream().map(subCategoryMapper::toSubCategoryResponse).toList();
        return subCategoriesResponse;
    }
}
