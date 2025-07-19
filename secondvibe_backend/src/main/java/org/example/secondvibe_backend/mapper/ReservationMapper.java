package org.example.secondvibe_backend.mapper;

import org.example.secondvibe_backend.dto.request.CreateReservationRequest;
import org.example.secondvibe_backend.entity.Client;
import org.example.secondvibe_backend.entity.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring",uses = {ReservationItemMapper.class})

public interface ReservationMapper {
    @Mapping(target ="reservationItems",source = "reservationItems")
    @Mapping(target ="client",source = "userId",qualifiedByName = "mapClient")
    @Mapping(target = "status", constant = "PENDING")
    Reservation toReservation(CreateReservationRequest createReservationRequest);
    @Named("mapClient")
    default Client mapClient(int clientId) {
        Client client = new Client();
        client.setId(clientId);
        return client;
    }
}
