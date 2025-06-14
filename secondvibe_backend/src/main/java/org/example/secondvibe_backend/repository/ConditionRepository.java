package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Condition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConditionRepository extends JpaRepository<Condition, Integer> {
}
