package org.example.secondvibe_backend.scheduled;

import jakarta.transaction.Transactional;
import org.example.secondvibe_backend.entity.*;
import org.example.secondvibe_backend.entity.enums.OrderStatus;
import org.example.secondvibe_backend.entity.enums.PaymentMethod;
import org.example.secondvibe_backend.entity.enums.Role;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.repository.AdministratorRepository;
import org.example.secondvibe_backend.repository.ClientRepository;
import org.example.secondvibe_backend.repository.OrderRepository;
import org.example.secondvibe_backend.repository.WalletRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class OrderPayoutScheduler {
    private final OrderRepository orderRepository;
    private final ClientRepository clientRepository;
    private final AdministratorRepository administratorRepository;
    private final WalletRepository walletRepository;
    public OrderPayoutScheduler(OrderRepository orderRepository, ClientRepository clientRepository, AdministratorRepository administratorRepository, WalletRepository walletRepository) {
        this.orderRepository = orderRepository;
        this.clientRepository = clientRepository;
        this.administratorRepository = administratorRepository;
        this.walletRepository = walletRepository;
    }

    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void autoPayoutToSellers() {
        LocalDate today = LocalDate.now();
        List<Order> orders = orderRepository.findAllByOrderStatus(OrderStatus.COMPLETED);
        System.out.println("Cong tien hom nay: "+today);
        for (Order order : orders) {
            if (order.getReceivedDate() != null && order.getReceivedDate().isEqual(today)) {
                Wallet wallet=walletRepository.findByClient_Id(order.getSeller().getId()).orElseThrow(()->new BaseException("Not found wallet seller"));
                double incomeSeller=order.getTotalAmount()*90/100;
                wallet.setBalance(wallet.getBalance()+incomeSeller);
                order.setOrderStatus(OrderStatus.PAID_TO_SELLER);
                walletRepository.save(wallet);
            }
        }
        orderRepository.saveAll(orders);
        orderRepository.flush();
    }

}
