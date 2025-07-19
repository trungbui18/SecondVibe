package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.request.CartDetailUpdateRequest;
import org.example.secondvibe_backend.dto.response.CartDetailResponse;
import org.example.secondvibe_backend.dto.response.SellerResponse;
import org.example.secondvibe_backend.entity.Cart;
import org.example.secondvibe_backend.entity.CartDetail;
import org.example.secondvibe_backend.entity.Client;
import org.example.secondvibe_backend.entity.Product;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.mapper.CartDetailMapper;
import org.example.secondvibe_backend.repository.CartDetailRepository;
import org.example.secondvibe_backend.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartDetailService {
    private final CartDetailRepository cartDetailRepository;
    private final CartDetailMapper cartDetailMapper;
    private final CartRepository cartRepository;

    public CartDetailService(CartDetailRepository cartDetailRepository, CartDetailMapper cartDetailMapper, CartRepository cartRepository) {
        this.cartDetailRepository = cartDetailRepository;
        this.cartDetailMapper = cartDetailMapper;
        this.cartRepository = cartRepository;
    }

    public List<SellerResponse> getCartGroupedBySeller(int clientId) {
        Optional<Cart> optionalCart = cartRepository.findByClientId(clientId);

        if (optionalCart.isEmpty()) {
            return new ArrayList<>(); // Không có giỏ hàng → trả danh sách rỗng
        }

        Cart cart = optionalCart.get();
        List<CartDetail> cartDetails = cartDetailRepository.findAllByCart_Id(cart.getId());

        if (cartDetails == null || cartDetails.isEmpty()) {
            return new ArrayList<>(); // Không có sản phẩm trong giỏ hàng
        }

        Map<Integer, SellerResponse> sellerMap = new HashMap<>();

        for (CartDetail detail : cartDetails) {
            Product product = detail.getProduct();
            Client seller = product.getSeller();
            int sellerId = seller.getId();

            // Nếu chưa có seller thì tạo mới
            sellerMap.putIfAbsent(sellerId, new SellerResponse(
                    sellerId,
                    seller.getFullName(),
                    seller.getAvatar(),
                    new ArrayList<>()
            ));

            // Thêm cart detail vào seller
            CartDetailResponse response = cartDetailMapper.toCartDetailResponse(detail);
            sellerMap.get(sellerId).getCartDetails().add(response);
        }

        return new ArrayList<>(sellerMap.values());
    }


    public void deleteCartDetailsByIds(List<Integer> ids) {
        CartDetail cartDetail = cartDetailRepository.findById(ids.get(0))
                .orElseThrow(()-> new BaseException("khong tim thay san pham trong gio hang"));
        Cart cart=cartRepository.findById(cartDetail.getCart().getId())
                .orElseThrow(()->new BaseException("khong tim thay gio hang"));
        cart.setQuantity(cart.getQuantity() - ids.size());
        cartRepository.save(cart);
        cartDetailRepository.deleteAllById(ids);
    }

    public void deleteCartDetailsById(int id) {
        CartDetail cartDetail = cartDetailRepository.findById(id)
                .orElseThrow(()-> new BaseException("khong tim thay san pham trong gio hang"));
        Cart cart=cartRepository.findById(cartDetail.getCart().getId())
                .orElseThrow(()->new BaseException("khong tim thay gio hang"));
        cart.setQuantity(cart.getQuantity() - 1);
        cartRepository.save(cart);
        cartDetailRepository.deleteById(id);
    }

    public void updateCartDetail(CartDetailUpdateRequest cartDetailUpdateRequest){
        CartDetail cartDetail=cartDetailRepository.findById(cartDetailUpdateRequest.getIdCartDetail()).orElseThrow(()->new BaseException("Not found cart detail"));
        cartDetail.setQuantity(cartDetailUpdateRequest.getQuantity());
        cartDetailRepository.save(cartDetail);
    }



}
