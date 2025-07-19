package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.WalletTransaction;
import org.example.secondvibe_backend.entity.enums.TransactionStatus;
import org.example.secondvibe_backend.entity.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, String> {

} 