package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.response.ClientProfileResponse;
import org.example.secondvibe_backend.entity.Client;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface ClientMapper {
    Client toClient(ClientProfileResponse clientProfileResponse);

    ClientProfileResponse toClientProfileResponse(Client client);
}
