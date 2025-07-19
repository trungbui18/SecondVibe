package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Condition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface ConditionRepository extends JpaRepository<Condition, Integer> {
    Optional<Condition> findByDescription(String name);
}
