package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.request.CreateOrderRequest;
import org.example.secondvibe_backend.dto.response.OrderBuyerResponse;
import org.example.secondvibe_backend.dto.response.OrderResponse;
import org.example.secondvibe_backend.dto.response.AllOrdersSellerResponse;
import org.example.secondvibe_backend.dto.response.OrderSellerResponse;
import org.example.secondvibe_backend.entity.Client;
import org.example.secondvibe_backend.entity.Order;
import org.example.secondvibe_backend.entity.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring",uses = {OrderDetailMapper.class})

public interface OrderMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "client",source = "client.id", qualifiedByName = "mapClient")
    Order toOrder(Reservation reservation);

    @Mapping(target = "idClient", source = "client.id")
    OrderResponse toOrderResponse(Order order);

    @Mapping(target = "orderDetails", ignore = true)
    Order createOrderRequestToOrder(CreateOrderRequest createOrderRequest);

    AllOrdersSellerResponse toOrdersSellerResponse(Order order);

    @Mapping(target = "orderDetails",source = "orderDetails")
    OrderSellerResponse toOrderSellerResponse(Order order);

    @Mapping(target = "name_seller" , source = "seller.fullName")
    @Mapping(target = "urlImage_seller" , source = "seller.avatar")
    @Mapping(target = "details",source = "orderDetails")
    @Mapping(target ="idSeller",source ="seller.id" )
    OrderBuyerResponse toOrderBuyerResponse(Order order);

    List<OrderBuyerResponse> toOrderBuyerResponses(List<Order> orders);


    @Named("mapClient")
    default Client mapClient(int cli) {
        Client client = new Client();
        client.setId(cli);
        return client;
    }
}
