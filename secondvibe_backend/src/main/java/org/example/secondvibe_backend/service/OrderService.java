package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.request.CreateReservationRequest;
import org.example.secondvibe_backend.entity.Client;
import org.example.secondvibe_backend.entity.Product;
import org.example.secondvibe_backend.entity.Reservation;
import org.example.secondvibe_backend.entity.Size;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.repository.ClientRepository;
import org.example.secondvibe_backend.repository.ProductRepository;
import org.example.secondvibe_backend.repository.ReservationRepository;
import org.example.secondvibe_backend.repository.SizeRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    private final ReservationRepository reservationRepository;
    private final ProductRepository productRepository;
    private final ClientRepository clientRepository;
    private final SizeRepository sizeRepository;
    public OrderService(ReservationRepository reservationRepository, ProductRepository productRepository, ClientRepository clientRepository, SizeRepository sizeRepository) {
        this.reservationRepository = reservationRepository;
        this.productRepository = productRepository;
        this.clientRepository = clientRepository;
        this.sizeRepository = sizeRepository;
    }

//    public boolean CreateReservation(CreateReservationRequest request) {
//        Reservation reservation = new Reservation();
//        reservation.setQuantity(request.getQuantity());
//        Product product=productRepository.findById(request.getProductId()).orElseThrow(()->new BaseException("Not found product"));
//        Client client=clientRepository.findById(request.getUserId()).orElseThrow(()->new BaseException("Not found client"));
//        Size size=sizeRepository.findById(request.getSizeId()).orElseThrow(()->new BaseException("Not found size"));
//        reservation.setProduct(product);
//        reservation.setSize(size);
//        reservation.setClient(client);
//        reservationRepository.save(reservation);
//        return true;
//    }

//    @Scheduled(cron = "0 * * * * *")
    public void deleteReservation() {
        int currentMinute = LocalDateTime.now().getMinute();
        List<Reservation> ds = reservationRepository.findByEndMinute(currentMinute);
        reservationRepository.deleteAll(ds);
        System.out.println("Đã xóa " + ds.size() + " đơn giữ hàng lúc phút " + currentMinute);
    }

}
