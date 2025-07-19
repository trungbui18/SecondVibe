package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.response.BrandResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.BrandService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/brand")
public class BrandController {
    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping("/public/get_all")
    public ApiResponse<List<BrandResponse>> getAll(){
        List<BrandResponse> brands=brandService.getAllBrand();
        return ApiResponseBuilder.success("Get All Brand Successfully",brands);
    }
}
