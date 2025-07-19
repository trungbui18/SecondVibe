package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.request.UpdateClientRequest;
import org.example.secondvibe_backend.dto.response.AllClientResponse;
import org.example.secondvibe_backend.dto.response.ClientDetailResponse;
import org.example.secondvibe_backend.dto.response.ClientProfileResponse;
import org.example.secondvibe_backend.dto.response.UpdateClientResponse;
import org.example.secondvibe_backend.entity.Account;
import org.example.secondvibe_backend.entity.Bank;
import org.example.secondvibe_backend.entity.Client;
import org.example.secondvibe_backend.entity.enums.AccountStatus;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.mapper.ClientMapper;
import org.example.secondvibe_backend.repository.AccountRepository;
import org.example.secondvibe_backend.repository.BankRepository;
import org.example.secondvibe_backend.repository.ClientRepository;
import org.example.secondvibe_backend.repository.WalletRepository;
import org.example.secondvibe_backend.service.S3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    private final BankRepository bankRepository;
    private final AccountRepository accountRepository;
    
    public ClientService(ClientRepository clientRepository, ClientMapper clientMapper, BankRepository bankRepository, WalletRepository walletRepository, S3Service s3Service, AccountRepository accountRepository) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
        this.bankRepository = bankRepository;
        this.accountRepository = accountRepository;

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

    public int getCountClient(){
        return clientRepository.countByAccount_Status(AccountStatus.ACTIVE);
    }
    
    /**
     * Cập nhật thông tin client và bank
     */
    @Transactional
    public UpdateClientResponse updateClient(Integer clientId, UpdateClientRequest request) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new BaseException("Không tìm thấy client"));
        
        LocalDate today = LocalDate.now();
        int age = today.getYear() - request.getBirthday().getYear();
        if (age < 16) {
            throw new BaseException("Tuổi phải từ 16 trở lên");
        }
        client.setFullName(request.getFullName());
        client.setSdt(request.getSdt());
        client.setAddress(request.getAddress());
        client.setBirthday(request.getBirthday());
        
        clientRepository.save(client);
        
        // Xử lý thông tin bank
        Bank bank = client.getBank();
        
        // Nếu có thông tin bank trong request
        if (request.getBankName() != null && !request.getBankName().trim().isEmpty()) {
            if (bank == null) {
                // Tạo mới bank nếu chưa có
                bank = new Bank();
                bank.setClient(client);
            }
            
            bank.setBankName(request.getBankName());
            bank.setAccountNumber(request.getAccountNumber());
            bank.setAccountHolderName(request.getAccountHolderName());
            bank.setBranch(request.getBranch());
            
            bankRepository.save(bank);
        }
        
        // Tạo response
        UpdateClientResponse response = new UpdateClientResponse();
        response.setId(client.getId());
        response.setFullName(client.getFullName());
        response.setSdt(client.getSdt());
        response.setAddress(client.getAddress());
        response.setBirthday(client.getBirthday());
        response.setAvatar(client.getAvatar());
        
        // Thêm thông tin bank nếu có
        if (bank != null) {
            response.setBankName(bank.getBankName());
            response.setAccountNumber(bank.getAccountNumber());
            response.setAccountHolderName(bank.getAccountHolderName());
            response.setBranch(bank.getBranch());
        }
        
        return response;
    }
    
    /**
     * Lấy thông tin chi tiết client bao gồm thông tin ngân hàng
     */
    public ClientDetailResponse getClientDetail(Integer clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new BaseException("Không tìm thấy client"));

        // Tính thời gian tham gia
        Period period = Period.between(client.getAccount().getCreate_at(), LocalDate.now());
        int year = period.getYears();
        int month = period.getMonths();
        int day = period.getDays();
        String joined = "";
        if (year > 0) joined += year + "Y ";
        if (month > 0) joined += month + "M ";
        if (day > 0) joined += day + "D ";
        if (joined.isEmpty()) joined += "Today";

        // Tạo response
        ClientDetailResponse response = new ClientDetailResponse();

        // Thông tin Client
        response.setId(client.getId());
        response.setFullName(client.getFullName());
        response.setSdt(client.getSdt());
        response.setAddress(client.getAddress());
        response.setBirthday(client.getBirthday());
        response.setAvatar(client.getAvatar());
        response.setAmount(client.getAmount());
        response.setJoined(joined);

        // Thông tin Account
        response.setEmail(client.getAccount().getEmail());

        // Thông tin Bank
        Bank bank = client.getBank();
        if (bank != null) {
            response.setBankName(bank.getBankName());
            response.setAccountNumber(bank.getAccountNumber());
            response.setAccountHolderName(bank.getAccountHolderName());
            response.setBranch(bank.getBranch());
        }

        return response;
    }

    public List<AllClientResponse> getAllClient(){
        List<AllClientResponse> rs=new ArrayList<AllClientResponse>();
        List<Client> ds=clientRepository.findAll();
        for(Client c:ds){
            AllClientResponse response=new AllClientResponse();
            response.setId(c.getId());
            response.setFullName(c.getFullName());
            response.setStatus(c.getAccount().getStatus());
            response.setEmail(c.getAccount().getEmail());
            response.setAvatar(c.getAvatar());
            response.setCreate_at(c.getAccount().getCreate_at());

            rs.add(response);
        }
        return rs;
    }

    public boolean updateAccountStatus(int id, AccountStatus status) {
        Client client=clientRepository.findById(id).orElseThrow(()->new BaseException("Ko tim thay client"));
        Optional<Account> optionalAccount = accountRepository.findById(client.getAccount().getId());
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setStatus(status);
            accountRepository.save(account);
            return true;
        }
        return false;
    }


}
