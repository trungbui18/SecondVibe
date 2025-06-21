package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.request.CreateReservationRequest;
import org.example.secondvibe_backend.entity.enums.PaymentMethod;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.ReservationService;
import org.example.secondvibe_backend.service.VNPayService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checkout")
public class CheckOutController {
    private final VNPayService VNPayService;
    private final ReservationService reservationService;
    public CheckOutController(VNPayService VNPayService, ReservationService reservationService) {
        this.VNPayService = VNPayService;
        this.reservationService = reservationService;
    }

    @PostMapping
    public ApiResponse<String> payment(@RequestBody CreateReservationRequest request){
        reservationService.CreateReservation(request);
        try {
            if(request.getPaymentMethod()== PaymentMethod.VNPAY){
                String url= VNPayService.createPayment(request.getTotalAmount());
                return ApiResponseBuilder.success("Open gateway ",url);
            }
            return ApiResponseBuilder.success("Open gateway ",null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
