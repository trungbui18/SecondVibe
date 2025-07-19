package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.response.OrderDetailSellerResponse;
import org.example.secondvibe_backend.dto.response.OrderSellerResponse;
import org.example.secondvibe_backend.entity.Order;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.mapper.OrderDetailMapper;
import org.example.secondvibe_backend.mapper.OrderMapper;
import org.example.secondvibe_backend.repository.OrderDetailRepository;
import org.example.secondvibe_backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailMapper orderDetailMapper;
    private final OrderMapper orderMapper;
    public OrderDetailService(OrderDetailRepository orderDetailRepository, OrderRepository orderRepository, OrderDetailMapper orderDetailMapper, OrderMapper orderMapper) {
        this.orderDetailRepository = orderDetailRepository;
        this.orderRepository = orderRepository;
        this.orderDetailMapper = orderDetailMapper;
        this.orderMapper = orderMapper;
    }

    public OrderSellerResponse getAllOrderDetailSeller(String idOrder){
        Order order = orderRepository.findById(idOrder).orElseThrow(()->new BaseException("ko thay Order"));
        return orderMapper.toOrderSellerResponse(order);
    }


}
