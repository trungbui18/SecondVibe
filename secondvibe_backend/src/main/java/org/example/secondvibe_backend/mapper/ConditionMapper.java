package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.ConditionResponse;
import org.example.secondvibe_backend.entity.Condition;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface ConditionMapper {
    Condition toCondition(ConditionResponse conditionResponse);
    ConditionResponse toConditionResponse(Condition condition);
}
