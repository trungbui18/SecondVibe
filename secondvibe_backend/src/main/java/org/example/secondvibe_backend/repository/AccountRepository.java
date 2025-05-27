package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
   boolean existsAccountByEmail(String email);
   Optional<Account> findByEmail(String email);
}
