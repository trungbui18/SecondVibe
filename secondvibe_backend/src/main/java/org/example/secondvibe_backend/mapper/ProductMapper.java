package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.request.ProductCreateRequest;
import org.example.secondvibe_backend.dto.response.*;
import org.example.secondvibe_backend.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;


@Mapper(componentModel = "spring", uses = {ProductSizeMapper.class,ProductImageMapper.class})
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", constant = "PENDING_APPROVAL")
    @Mapping(target = "seller", source = "seller", qualifiedByName = "mapSeller")
    @Mapping(target = "condition", source = "condition", qualifiedByName = "mapCondition")
    @Mapping(target = "brand", source = "brand", qualifiedByName = "mapBrand")
    @Mapping(target = "subCategory", source = "subCategory", qualifiedByName = "mapSubCategory")
    @Mapping(target = "images", ignore = true)
    @Mapping(source = "productSizes", target = "productSizes")
    Product toProduct(ProductCreateRequest dto);

    @Mapping(source = "seller.id", target = "seller")
    @Mapping(source = "seller.fullName", target = "sellerName")
    @Mapping(source = "seller.avatar", target = "imageSeller")
    @Mapping(source = "seller.sdt", target = "sdt")
    @Mapping(source = "condition.description", target = "condition")
    @Mapping(source = "brand.name", target = "brand")
    @Mapping(source = "subCategory.name", target = "subCategory")
    @Mapping(source = "subCategory.category.name", target = "category")
    @Mapping(source = "productSizes", target = "productSizes")
    @Mapping(source = "images",target = "images")
    ProductResponse toProductResponse(Product product);

    @Mapping(source = "condition.description", target = "condition")
    @Mapping(source = "images", target = "img",qualifiedByName = "firstImageUrl")
    ProductInProfile toProductInProfile(Product product);

    @Mapping(source = "subCategory.category.name",target = "category")
    @Mapping(source="subCategory.name" , target = "subCategory")
    AllProductAdminResponse toAllProductAdminResponse(Product product);

    List<AllProductAdminResponse> toAllProductAdminResponse(List<Product> products);

    @Mapping(source = "images",target = "images")
    AllProductRejectedResponse toAllProductRejectedResponse(Product product);

    List<AllProductRejectedResponse> toAllProductRejectedResponse(List<Product> products);

    @Mapping(source = "images", target = "img",qualifiedByName = "firstImageUrl")
    MyProductResponse toMyProductResponse(Product product);

    @Mapping(source = "seller.id", target = "seller")
    @Mapping(source = "seller.fullName", target = "sellerName")
    @Mapping(source = "seller.avatar", target = "imageSeller")
    @Mapping(source = "condition.description", target = "condition")
    @Mapping(source = "brand.name", target = "brand")
    @Mapping(source = "subCategory.name", target = "subCategory")
    @Mapping(source = "subCategory.category.name", target = "category")
    @Mapping(source = "images", target = "img",qualifiedByName = "firstImageUrl")
    ProductViewResponse toProductViewResponse(Product product);

    List<ProductViewResponse> toProductViewResponses(List<Product> products);
    @Named("firstImageUrl")
    default String getFirstImageUrl(List<ProductImage> images) {
        if (images != null && !images.isEmpty()) {
            return images.get(0).getUrlImage();
        }
        return null;
    }

    @Named("mapSeller")
    default Client mapSeller(int sellerId) {
        Client client = new Client();
        client.setId(sellerId);
        return client;
    }

    @Named("mapCondition")
    default Condition mapCondition(int id) {
        Condition c = new Condition();
        c.setId(id);
        return c;
    }

    @Named("mapBrand")
    default Brand mapBrand(int id) {
        Brand b = new Brand();
        b.setId(id);
        return b;
    }

    @Named("mapSubCategory")
    default SubCategory mapSubCategory(int id) {
        SubCategory sc = new SubCategory();
        sc.setId(id);
        return sc;
    }
}
