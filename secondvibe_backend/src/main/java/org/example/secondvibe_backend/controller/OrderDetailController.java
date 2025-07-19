package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.response.OrderSellerResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.OrderDetailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orderdetail")
public class OrderDetailController {
    private final OrderDetailService orderDetailService;

    public OrderDetailController(OrderDetailService orderDetailService) {
        this.orderDetailService = orderDetailService;
    }

    @GetMapping("/client/get_all_by_orderID/{idOrder}")
    public ApiResponse<OrderSellerResponse> getAllOrderDetailsSeller(@PathVariable String idOrder) {
        OrderSellerResponse orderSellerResponse = orderDetailService.getAllOrderDetailSeller(idOrder);
        return ApiResponseBuilder.success("Get All Order Detail By Order Successfully ! ",orderSellerResponse);
    }
}
