package org.example.secondvibe_backend.repository;

import org.example.secondvibe_backend.entity.Cart;
import org.example.secondvibe_backend.entity.CartDetail;
import org.example.secondvibe_backend.entity.Product;
import org.example.secondvibe_backend.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    List<CartDetail> findAllByCart_Id(Integer id);
    int countByCart(Cart cart);
    CartDetail findByCartAndProductAndSize(Cart cart, Product product, Size size);
    CartDetail findByCartAndProduct_IdAndSize_Id(Cart cart, Integer id, String size);

}
