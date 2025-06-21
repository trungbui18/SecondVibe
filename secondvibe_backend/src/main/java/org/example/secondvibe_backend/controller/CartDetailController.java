package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.request.CartDetailUpdateRequest;
import org.example.secondvibe_backend.dto.response.CartDetailResponse;
import org.example.secondvibe_backend.dto.response.SellerResponse;
import org.example.secondvibe_backend.entity.CartDetail;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.CartDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cart_detail")
public class CartDetailController {
    private final CartDetailService cartDetailService;

    public CartDetailController(CartDetailService cartDetailService) {
        this.cartDetailService = cartDetailService;
    }

    @GetMapping("/get_all_by_idclient/{idClient}")
    public ApiResponse<List<SellerResponse>> getAllByIdClient(@PathVariable int idClient) {
        List<SellerResponse> result = cartDetailService.getCartGroupedBySeller(idClient);
        return ApiResponseBuilder.success("Get all successfully !", result!=null?result:new ArrayList<>());
    }

    @DeleteMapping("/delete_all")
    public ApiResponse<String> deleteAll(@RequestBody List<Integer> ids) {
        cartDetailService.deleteCartDetailsByIds(ids);
        return ApiResponseBuilder.success("Delete successfully!", "success");
    }
    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> deleteById(@PathVariable int id) {
        cartDetailService.deleteCartDetailsById(id);
        return ApiResponseBuilder.success("Delete successfully!", "success");
    }

    @PutMapping("/update_cartdetail")
    public ApiResponse<String> updateCartDetail(@RequestBody CartDetailUpdateRequest cartDetailUpdateRequest) {
        cartDetailService.updateCartDetail(cartDetailUpdateRequest);
        return ApiResponseBuilder.success("Update successfully!", "success");
    }


}
