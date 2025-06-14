package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.response.ConditionResponse;
import org.example.secondvibe_backend.entity.Condition;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.ConditionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/condition")
public class ConditionController {
    private final ConditionService conditionService;

    public ConditionController(ConditionService conditionService) {
        this.conditionService = conditionService;
    }

    @GetMapping("/get_all")
    public ApiResponse<List<ConditionResponse>> getAll(){
        List<ConditionResponse> conditions = conditionService.getAll();
        return ApiResponseBuilder.success("Get all condition successfully", conditions);
    }
}
