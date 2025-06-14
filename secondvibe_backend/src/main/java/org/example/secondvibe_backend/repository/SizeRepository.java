package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeRepository extends JpaRepository<Size, String> {
}
