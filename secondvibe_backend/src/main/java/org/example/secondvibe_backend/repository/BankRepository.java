package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankRepository extends JpaRepository<Bank, String> {
    Bank findByClient_Id(Integer clientId);
} 