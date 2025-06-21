package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.response.ClientProfileResponse;
import org.example.secondvibe_backend.entity.Client;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.mapper.ClientMapper;
import org.example.secondvibe_backend.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    public ClientService(ClientRepository clientRepository, ClientMapper clientMapper) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
    }

    public ClientProfileResponse getClientById(int id){
        Client client=clientRepository.findById(id).orElseThrow(()->new BaseException("ko tim thay user"));
        ClientProfileResponse clientProfileResponse=clientMapper.toClientProfileResponse(client);
        Period period=Period.between(client.getAccount().getCreate_at(),LocalDate.now());
        int year=period.getYears();
        int month=period.getMonths();
        int day=period.getDays();
        String joined = "";
        if(year>0) joined+=year+ "Y ";
        if(month>0) joined+=month+ "M ";
        if(day>0) joined+=day+ "D ";
        if(joined.isEmpty()) joined += "Today";
        clientProfileResponse.setJoined(joined);
        return clientProfileResponse;
    }
}
