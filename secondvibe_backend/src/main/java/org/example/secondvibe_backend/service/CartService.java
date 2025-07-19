package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.request.CartCreateRequest;
import org.example.secondvibe_backend.dto.response.CartResponse;
import org.example.secondvibe_backend.entity.*;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.mapper.CartMapper;
import org.example.secondvibe_backend.repository.*;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartMapper cartMapper;
    private final ClientRepository clientRepository;
    private final CartDetailRepository cartDetailRepository;
    private final ProductRepository productRepository;
    private final SizeRepository sizeRepository;

    public CartService(CartRepository cartRepository, CartMapper cartMapper, ClientRepository clientRepository, CartDetailRepository cartDetailRepository, ProductRepository productRepository, SizeRepository sizeRepository) {
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
        this.clientRepository = clientRepository;
        this.cartDetailRepository = cartDetailRepository;
        this.productRepository = productRepository;
        this.sizeRepository = sizeRepository;
    }

    private Cart createCart(int idClient) {
        Cart cart = new Cart();
        Client client = clientRepository.findById(idClient).orElseThrow(()->new BaseException("Client not found"));
        cart.setClient(client);
        cart.setQuantity(0);
        return cartRepository.save(cart);
    }

    public CartResponse addToCart(CartCreateRequest cartCreateRequest) {
        Cart cart=cartRepository.findByClientId(cartCreateRequest.getIdClient()).orElseGet(()->createCart(cartCreateRequest.getIdClient()));
        cartRepository.save(cart);

        Product product=productRepository.findById(cartCreateRequest.getProductId()).orElseThrow(()->new BaseException("Product not found"));
        Size size=sizeRepository.findById(cartCreateRequest.getSizeId()).orElseThrow(()->new BaseException("Size not found"));
        CartDetail cartdt=cartDetailRepository.findByCartAndProductAndSize(cart,product,size);
        if(cartdt!=null){
            cartdt.setQuantity(cartdt.getQuantity()+cartCreateRequest.getQuantity());
            cartDetailRepository.save(cartdt);
        }else{
            CartDetail cartDetail=new CartDetail();
            cartDetail.setProduct(product);
            cartDetail.setCart(cart);
            cartDetail.setSize(size);
            cartDetail.setQuantity(cartCreateRequest.getQuantity());
            cart.setQuantity(cart.getQuantity()+1);
            cartDetailRepository.save(cartDetail);
        }
        return cartMapper.toCartResponse(cart);
    }

    public CartResponse getCartByIdUser(int idUser){
        Cart cart=cartRepository.findByClientId(idUser).orElseThrow(()->new BaseException("Cart not found"));
        return cartMapper.toCartResponse(cart);
    }

}
