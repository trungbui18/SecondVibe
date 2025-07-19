package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Administrator;
import org.example.secondvibe_backend.entity.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {
    Optional<Administrator> findByAccount_Role(Role role);

}
