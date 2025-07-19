package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.request.CreateOrderRequest;
import org.example.secondvibe_backend.dto.request.PaymentRequest;
import org.example.secondvibe_backend.dto.request.UpdateStatusOrderRequest;
import org.example.secondvibe_backend.dto.response.*;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.OrderService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {
    private final OrderService orderService;
    private static final Logger log = LoggerFactory.getLogger(OrderController.class);


    public OrderController(OrderService orderService ) {
        this.orderService = orderService;
    }

    @GetMapping("/admin/count")
    public ApiResponse<Integer> countOrders() {
        int count = orderService.countOrders();
        return ApiResponseBuilder.success("Count Orders", count);
    }

    @GetMapping("/admin/status-counts")
    public ApiResponse<List<OrderStatusCountResponse>> getOrderStatusCounts() {
        try {
            List<OrderStatusCountResponse> statusCounts = orderService.getOrderStatusCounts();
            return ApiResponseBuilder.success("Số lượng đơn hàng theo trạng thái", statusCounts);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/client/update_status")
    public ApiResponse<String> updateStatus(@RequestBody UpdateStatusOrderRequest request) {
        try {
            String res=orderService.udpateStatusOrder(request);
            return ApiResponseBuilder.success("Update Status Order", res);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/public/top_sellers")
    public ApiResponse<List<TopSellerResponse>> getTopSellers(
            @RequestParam(defaultValue = "4") int topN) {
        try {
            List<TopSellerResponse> topSellers = orderService.getTopSellers(topN);
            return ApiResponseBuilder.success("Top sellers fetched", topSellers);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/admin/revenue")
    public ApiResponse<Map<String, Double>> revenue() {
        try {
            double revenuePlatform = orderService.getRevenuePlatform();
            double revenueAdmin = orderService.getRevenueAdmin();

            Map<String, Double> data = new HashMap<>();
            data.put("platformRevenue", revenuePlatform);
            data.put("adminRevenue", revenueAdmin);

            return ApiResponseBuilder.success("Doanh thu hệ thống", data);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/client/get_all_orders_seller")
    public ApiResponse<List<AllOrdersSellerResponse>> getAllOrdersSeller(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int idUser = ((Long)jwt.getClaim("idUser")).intValue();
        List<AllOrdersSellerResponse> ds=orderService.AllOrderSeller(idUser);
        return ApiResponseBuilder.success("All Orders Seller", ds);
    }

    @GetMapping("/client/get_all_orders_buyer")
    public ApiResponse<List<OrderBuyerResponse>> getAllOrdersBuyer(Authentication authentication) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            int idUser = ((Long)jwt.getClaim("idUser")).intValue();
            List<OrderBuyerResponse> ds=orderService.AllOrderBuyer(idUser);
            return ApiResponseBuilder.success("All Orders Buyer", ds);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/public/top-ordered")
    public ApiResponse<List<ProductViewResponse>> getTopOrderedProducts() {
        List<ProductViewResponse> topProducts = orderService.getTopOrderedProducts();
        return ApiResponseBuilder.success("Successfully", topProducts);
    }


    @PostMapping("/client/pay/create")
    public ApiResponse<Integer> createOrderVNPay(@RequestBody PaymentRequest paymentRequest,Authentication authentication ) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            int idUser = ((Long)jwt.getClaim("idUser")).intValue();
            orderService.createOrderPay(idUser,paymentRequest);
            return ApiResponseBuilder.success("Create order successfully !", 200);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Lỗi khi tạo đơn hàng: " + e.getMessage(), e);
        }

    }

    @PostMapping("/client/cod/create")
    public ApiResponse<String> createOrderCod(@RequestBody CreateOrderRequest request, Authentication authentication) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            int idUser = ((Long)jwt.getClaim("idUser")).intValue();
            orderService.createOrderCOD(idUser,request);
            return ApiResponseBuilder.success("Create order successfully !", "Successful");
        } catch (Exception e) {
            e.printStackTrace(); // In stack trace ra console
            throw new RuntimeException("Lỗi khi tạo đơn hàng: " + e.getMessage(), e);
        }
    }

    @GetMapping("/client/seller_stats")
    public ApiResponse<Map<String, Object>> getSellerStats(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int idUser = ((Long)jwt.getClaim("idUser")).intValue();
        Map<String, Object> stats = orderService.getSellerStats(idUser);
        stats.put("revenue", stats.get("revenue"));
        return ApiResponseBuilder.success("Seller statistics", stats);
    }

    @GetMapping("/client/seller_recent_orders")
    public ApiResponse<List<AllOrdersSellerResponse>> getSellerRecentOrders(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int idUser = ((Long)jwt.getClaim("idUser")).intValue();
        List<AllOrdersSellerResponse> orders = orderService.getSellerRecentOrders(idUser);
        return ApiResponseBuilder.success("5 đơn hàng gần nhất của seller", orders);
    }

    @GetMapping("/client/seller_monthly_stats")
    public ApiResponse<List<Map<String, Object>>> getSellerMonthlyStats(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int idUser = ((Long)jwt.getClaim("idUser")).intValue();
        List<Map<String, Object>> stats = orderService.getSellerMonthlyStats(idUser);
        return ApiResponseBuilder.success("Thống kê doanh thu và số đơn hàng theo tháng", stats);
    }

}
