package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.request.ReservationItemRequest;
import org.example.secondvibe_backend.entity.Product;
import org.example.secondvibe_backend.entity.ReservationItem;
import org.example.secondvibe_backend.entity.Size;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")

public interface ReservationItemMapper {
    @Mapping(target = "product",source = "productId",qualifiedByName = "mapProduct")
    @Mapping(target = "size",source = "sizeId",qualifiedByName = "mapSize")
    ReservationItem mapReservationItem(ReservationItemRequest reservationItemRequest);

    @Named("mapProduct")
    default Product mapProduct(int idProduct) {
        Product product = new Product();
        product.setId(idProduct);
        return product;
    }
    @Named("mapSize")
    default Size mapSize(String sizeId) {
        Size size = new Size();
        size.setId(sizeId);
        return size;
    }
}
