package org.example.secondvibe_backend.repository;

import jakarta.persistence.LockModeType;
import org.example.secondvibe_backend.entity.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductSizeRepository extends JpaRepository <ProductSize, Integer>{
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT ps FROM ProductSize ps WHERE ps.product.id = :productId AND ps.size.id = :sizeId")
    Optional<ProductSize> findForUpdate(@Param("productId") int productId, @Param("sizeId") String sizeId);

    Optional<ProductSize> findByProduct_IdAndAndSize_Id(int product_Id, String size_Id);

    @Query("SELECT SUM(p.quantity) FROM ProductSize p where p.product.id=:idProduct")
    Integer sumQuantity(@Param("idProduct") int idProduct);
}
