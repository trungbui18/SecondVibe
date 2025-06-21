package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductSizeRepository extends JpaRepository <ProductSize, Integer>{
    Optional<ProductSize> findByProduct_IdAndAndSize_Id(int product_Id, String size_Id);
}
