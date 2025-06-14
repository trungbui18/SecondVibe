package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Product;
import org.example.secondvibe_backend.entity.enums.ProductStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    @EntityGraph(attributePaths = {"condition", "brand", "subCategory", "productSizes", "productSizes.size"})
    Optional<Product> findWithAllDetailsById(int id);

    List<Product> findBySeller_IdAndStatusNot(int idSeller, ProductStatus status);
}
