package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.dto.response.ClientProfileResponse;
import org.example.secondvibe_backend.response.ApiResponse;
import org.example.secondvibe_backend.response.ApiResponseBuilder;
import org.example.secondvibe_backend.service.ClientService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/{id}")
    public ApiResponse<ClientProfileResponse> getClientById(@PathVariable int id){
        ClientProfileResponse clientProfileResponse = clientService.getClientById(id);
        return ApiResponseBuilder.success("Get Client By Id Successfully !", clientProfileResponse);
    }
}
