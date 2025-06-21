package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.request.CreateReservationRequest;
import org.example.secondvibe_backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

//    @PostMapping("/create")
//    public ResponseEntity<?> create(@RequestBody CreateReservationRequest request) {
//        boolean result = orderService.CreateReservation(request);
//        return ResponseEntity.ok("Đặt giữ hàng thành công");
//    }

}
