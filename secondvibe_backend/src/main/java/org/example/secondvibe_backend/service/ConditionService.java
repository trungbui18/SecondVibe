package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.response.ConditionResponse;
import org.example.secondvibe_backend.entity.Condition;
import org.example.secondvibe_backend.mapper.ConditionMapper;
import org.example.secondvibe_backend.repository.ConditionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConditionService {
    private final ConditionRepository conditionRepository;
    private final ConditionMapper conditionMapper;
    public ConditionService(ConditionRepository conditionRepository, ConditionMapper conditionMapper) {
        this.conditionRepository = conditionRepository;
        this.conditionMapper = conditionMapper;
    }

    public List<ConditionResponse> getAll(){
        List<Condition> conditions = conditionRepository.findAll();
        List<ConditionResponse> conditionResponses = conditions.stream().map(conditionMapper::toConditionResponse).collect(Collectors.toList());
       return conditionResponses;
    }
}
