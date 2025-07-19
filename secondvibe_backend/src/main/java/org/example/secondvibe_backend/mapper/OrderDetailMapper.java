package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.request.OrderDetailRequest;
import org.example.secondvibe_backend.dto.response.OrderDetailBuyerResponse;
import org.example.secondvibe_backend.dto.response.OrderDetailSellerResponse;
import org.example.secondvibe_backend.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")

public interface OrderDetailMapper {
    @Mapping(target = "id", ignore = true)
    OrderDetail toOrderDetail(ReservationItem reservationItem);

    @Mapping(target = "product",source = "productId",qualifiedByName = "mapProduct")
    @Mapping(target = "size",source = "sizeId",qualifiedByName = "mapSize")
    OrderDetail toOrderDetail(OrderDetailRequest orderDetailRequest);
    List<OrderDetail> toOrderDetails(List<OrderDetailRequest> orderDetailRequests);

    @Mapping(target ="size", source = "size.id")
    @Mapping(target = "name",source = "product.name")
    @Mapping(target = "description",source = "product.description")
    @Mapping(target = "imgUrl",source = "product.images",qualifiedByName = "firstImageUrl")
    OrderDetailSellerResponse toOrderDetailSellerResponse(OrderDetail orderDetail);

    List<OrderDetailSellerResponse> toOrderDetailSellerResponses(List<OrderDetail> orderDetails);

    @Mapping(target = "urlImage",source = "product.images",qualifiedByName = "firstImageUrl")
    @Mapping(target = "size", source = "size.id")
    @Mapping(target = "idProduct",source="product.id")
    @Mapping(target = "name",source="product.name")
    OrderDetailBuyerResponse toOrderDetailBuyerResponse(OrderDetail orderDetail);

    @Named("firstImageUrl")
    default String getFirstImageUrl(List<ProductImage> images) {
        if (images != null && !images.isEmpty()) {
            return images.get(0).getUrlImage();
        }
        return null;
    }

    @Named("mapProduct")
    default Product toProduct(int productId) {
        Product product = new Product();
        product.setId(productId);
        return product;
    }
    @Named("mapSize")
    default Size mapSize(String sizeId) {
        Size size = new Size();
        size.setId(sizeId);
        return size;
    }
}
