package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.request.UpdateClientRequest;
import org.example.secondvibe_backend.dto.response.AllClientResponse;
import org.example.secondvibe_backend.dto.response.ClientProfileResponse;
import org.example.secondvibe_backend.dto.response.ClientDetailResponse;
import org.example.secondvibe_backend.dto.response.UpdateClientResponse;
import org.example.secondvibe_backend.entity.enums.AccountStatus;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.ClientService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/public/{id}")
    public ApiResponse<ClientProfileResponse> getClientById(@PathVariable int id){
        ClientProfileResponse clientProfileResponse = clientService.getClientById(id);
        return ApiResponseBuilder.success("Get Client By Id Successfully !", clientProfileResponse);
    }

    @GetMapping("/admin/count")
    public ApiResponse<Integer> getCountClient(){
        int count= clientService.getCountClient();
        return ApiResponseBuilder.success("Get Client Count Successfully !", count);
    }

    @GetMapping("/detail")
    public ApiResponse<ClientDetailResponse> getClientDetail(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int idUser = ((Long)jwt.getClaim("idUser")).intValue();
        ClientDetailResponse detail = clientService.getClientDetail(idUser);
        return ApiResponseBuilder.success("Get Client Detail Successfully!", detail);
    }

    @PutMapping("/client/update")
    public ApiResponse<UpdateClientResponse> updateClientDetail(@RequestBody UpdateClientRequest updateClientRequest
    , Authentication authentication) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            int idUser = ((Long)jwt.getClaim("idUser")).intValue();
            UpdateClientResponse rs=clientService.updateClient(idUser, updateClientRequest);
            return ApiResponseBuilder.success("Update Client Successfully !", rs);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/admin/get_all_clients")
    public ApiResponse<List<AllClientResponse>> getAllClients() {
        List<AllClientResponse> rs=clientService.getAllClient();
        return ApiResponseBuilder.success("Get All Client Successfully !", rs);
    }

    @PutMapping("/admin/update-status")
    public ApiResponse<Boolean> updateStatus(
            @RequestParam int id,
            @RequestParam AccountStatus status) {

        boolean result = clientService.updateAccountStatus(id, status);
        return ApiResponseBuilder.success("Update Status Successfully !", result);
    }
}
