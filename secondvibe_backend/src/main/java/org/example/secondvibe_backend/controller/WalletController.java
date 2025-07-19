package org.example.secondvibe_backend.controller;

import jakarta.validation.Valid;
import org.example.secondvibe_backend.dto.request.UpdateWithdrawRequest;
import org.example.secondvibe_backend.dto.request.WithdrawRequest;
import org.example.secondvibe_backend.dto.response.WithdrawResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.WalletService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wallet")
public class WalletController {
    
    private final WalletService walletService;
    
    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @PostMapping("/withdraw/request")
    public ApiResponse<WithdrawResponse> createWithdrawRequest(@Valid @RequestBody WithdrawRequest request) {
        int clientId = 14; // Tạm thời hardcode cho test
        WithdrawResponse response = walletService.withdraw(request, clientId);
        return ApiResponseBuilder.success("Tạo yêu cầu rút tiền thành công", response);
    }

    @PutMapping("/update")
    public ApiResponse<String> updateWithdrawRequest(@RequestBody UpdateWithdrawRequest req ) {
        try {
            String response = walletService.updateWithdraw(req);
            return ApiResponseBuilder.success("Chuyển trạng thái thành: "+response, response);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

} 