package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Product;
import org.example.secondvibe_backend.entity.enums.ProductStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {

    @Query("SELECT p FROM Product p WHERE p.seller.id = :sellerId AND p.status NOT IN (:excludedStatuses)")
    List<Product> findAllBySellerIdAndStatusNotIn(@Param("sellerId") int sellerId, @Param("excludedStatuses") List<ProductStatus> excludedStatuses);
    List<Product> findBySeller_IdAndStatusNot(int idSeller, ProductStatus status);
    Integer countByStatus(ProductStatus status);
    List<Product> findTop10ByNameContainingIgnoreCaseAndStatus(String keyword, ProductStatus status);
    @Query("SELECT p FROM Product p WHERE p.status NOT IN (:excludedStatuses)")
    List<Product> findAllByStatusNotIn(@Param("excludedStatuses") List<ProductStatus> excludedStatuses);
    List<Product> findAllByStatus(@Param("status") ProductStatus status);

    List<Product> findByStatus(ProductStatus status);

    @Query("SELECT DISTINCT p FROM Product p JOIN p.productSizes ps JOIN ps.size s WHERE (:categoryName = '' OR p.subCategory.category.name = :categoryName) " +
            "AND (:subCategoryId = 0 OR p.subCategory.id = :subCategoryId) " +
            "AND (:brandId = 0 OR p.brand.id = :brandId) " +
            "AND (:conditionId = 0 OR p.condition.id = :conditionId) " +
            "AND (:priceFrom = 0 OR p.price >= :priceFrom) " +
            "AND (:priceTo = 0 OR p.price <= :priceTo) " +
            "AND (:keyword IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:sizeId IS NULL OR :sizeId = '' OR s.id = :sizeId) " +
            "AND p.status = org.example.secondvibe_backend.entity.enums.ProductStatus.APPROVED")
    List<Product> filterProducts(@Param("categoryName") String categoryName,
                                @Param("subCategoryId") int subCategoryId,
                                @Param("brandId") int brandId,
                                @Param("conditionId") int conditionId,
                                @Param("priceFrom") int priceFrom,
                                @Param("priceTo") int priceTo,
                                @Param("keyword") String keyword,
                                @Param("sizeId") String sizeId);

    List<Product> findByBrand_NameAndStatusNotIn(String brandName, @Param("excludedStatuses") List<ProductStatus> excludedStatuses);

}
