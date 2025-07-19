package org.example.secondvibe_backend.scheduled;

import jakarta.transaction.Transactional;
import org.example.secondvibe_backend.entity.Order;
import org.example.secondvibe_backend.entity.enums.OrderStatus;
import org.example.secondvibe_backend.repository.ClientRepository;
import org.example.secondvibe_backend.repository.OrderRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component

public class DeliveryScheduler {
    private final OrderRepository orderRepository;

    public DeliveryScheduler(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void autoMarkDeliveredOrders() {
        LocalDate today = LocalDate.now();
        List<Order> orders = orderRepository.findAllByOrderStatus(OrderStatus.DELIVERED);

        for (Order order : orders) {
            if (order.getReceivedDate() != null
                    && order.getReceivedDate().isEqual(today)) {

                order.setOrderStatus(OrderStatus.COMPLETED);
                order.setReceivedDate(today);
                orderRepository.save(order);
                System.out.println("Auto COMPLETED đơn hàng: " + order.getId());
            }
        }

        orderRepository.flush();
    }
}
