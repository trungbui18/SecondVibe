package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, String> {
    Optional<Wallet> findByAdministrator_Id(int id);
    Optional<Wallet> findByClient_Id(int id);
} 