package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.request.UpdateWithdrawRequest;
import org.example.secondvibe_backend.dto.request.WithdrawRequest;
import org.example.secondvibe_backend.dto.response.WalletInfoResponse;
import org.example.secondvibe_backend.dto.response.WithdrawResponse;
import org.example.secondvibe_backend.entity.*;
import org.example.secondvibe_backend.entity.enums.TransactionStatus;
import org.example.secondvibe_backend.entity.enums.TransactionType;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WalletService {
    
    private final WalletRepository walletRepository;
    private final WalletTransactionRepository walletTransactionRepository;
    private final ClientRepository clientRepository;
    private final BankRepository bankRepository;
    
    public WalletService(WalletRepository walletRepository, 
                        WalletTransactionRepository walletTransactionRepository,
                        ClientRepository clientRepository,
                        BankRepository bankRepository) {
        this.walletRepository = walletRepository;
        this.walletTransactionRepository = walletTransactionRepository;
        this.clientRepository = clientRepository;
        this.bankRepository = bankRepository;
    }
    

    @Transactional
    public WithdrawResponse withdraw(WithdrawRequest withdrawRequest, int idUser) {
        Client client = clientRepository.findById(idUser).orElseThrow(() -> new BaseException("Client not found"));
        Wallet wallet = client.getWallet();

        if(withdrawRequest.getAmount() > wallet.getBalance()) {
            throw new BaseException("Insufficient funds");
        }

        WalletTransaction walletTransaction = new WalletTransaction();
        walletTransaction.setWallet(wallet);
        walletTransaction.setAmount(withdrawRequest.getAmount());
        walletTransaction.setType(TransactionType.WITHDRAW);
        walletTransaction.setDescription(withdrawRequest.getDescription());
        walletTransactionRepository.save(walletTransaction);

        WithdrawResponse withdrawResponse = new WithdrawResponse();
        withdrawResponse.setAmount(withdrawRequest.getAmount());
        withdrawResponse.setDescription(withdrawRequest.getDescription());
        withdrawResponse.setStatus(walletTransaction.getStatus());
        withdrawResponse.setCreatedAt(LocalDateTime.now());
        withdrawResponse.setTransactionId(walletTransaction.getId());
        withdrawResponse.setRemainingBalance(wallet.getBalance() -withdrawRequest.getAmount());

        return withdrawResponse;
    }

    public String updateWithdraw(UpdateWithdrawRequest req){
        WalletTransaction walletTransaction=walletTransactionRepository.findById(req.getId()).orElseThrow(() -> new BaseException("Transaction not found"));
        walletTransaction.setStatus(req.getStatus());
        walletTransactionRepository.save(walletTransaction);

        if(req.getStatus()==TransactionStatus.REJECTED){
            walletTransaction.setRejectionReason(req.getRejectionReason());
            walletTransactionRepository.save(walletTransaction);
            return TransactionStatus.REJECTED.toString();
        }

        if(req.getStatus()==TransactionStatus.COMPLETED){
            truTien(walletTransaction.getAmount(),walletTransaction.getWallet().getId());
        }

        return walletTransaction.getStatus().toString();
    }

    private void truTien(double amount,String id){
        Wallet wallet=walletRepository.findById(id).orElseThrow(() -> new BaseException("Wallet not found"));
        wallet.setBalance(wallet.getBalance()-amount);
        walletRepository.save(wallet);
    }



}