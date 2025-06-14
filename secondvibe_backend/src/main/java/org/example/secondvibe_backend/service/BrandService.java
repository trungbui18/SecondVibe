package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.response.BrandResponse;
import org.example.secondvibe_backend.entity.Brand;
import org.example.secondvibe_backend.mapper.BrandMapper;
import org.example.secondvibe_backend.repository.BrandRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandService {
    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;
    public BrandService(BrandRepository brandRepository, BrandMapper brandMapper) {
        this.brandRepository = brandRepository;
        this.brandMapper = brandMapper;
    }

    public List<BrandResponse> getAllBrand(){
        List<Brand> brands = brandRepository.findAll();
        List<BrandResponse> brandResponses = brands.stream().map(brandMapper::toBrandResponse).collect(Collectors.toList());
        return brandResponses;
    }
}
