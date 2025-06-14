package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.request.ProductCreateRequest;
import org.example.secondvibe_backend.dto.response.ProductResponse;
import org.example.secondvibe_backend.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;


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
    @Mapping(source = "condition.description", target = "condition")
    @Mapping(source = "brand.name", target = "brand")
    @Mapping(source = "subCategory.name", target = "subCategory")
    @Mapping(source = "productSizes", target = "productSizes")
    @Mapping(source = "images",target = "images")
    ProductResponse toProductResponse(Product product);

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
