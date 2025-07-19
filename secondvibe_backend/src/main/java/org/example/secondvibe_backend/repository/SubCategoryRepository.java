package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
    Optional<SubCategory> findByName(String name);
    List<SubCategory> findByCategory_Name(String name);
}
