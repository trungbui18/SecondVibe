package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.response.SizeResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.SizeService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/size")
public class SizeController {
    private final SizeService sizeService;

    public SizeController(SizeService sizeService) {
        this.sizeService = sizeService;
    }

    @GetMapping("/get_all")
    public ApiResponse<List<SizeResponse>>getAll(){
        List<SizeResponse> ds= sizeService.getAll();
        return ApiResponseBuilder.success("Get all size successfully !",ds);
    }
}
