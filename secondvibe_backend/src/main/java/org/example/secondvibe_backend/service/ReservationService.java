package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.request.CreateReservationRequest;
import org.example.secondvibe_backend.entity.*;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.mapper.ReservationMapper;
import org.example.secondvibe_backend.repository.ClientRepository;
import org.example.secondvibe_backend.repository.ProductRepository;
import org.example.secondvibe_backend.repository.ReservationRepository;
import org.example.secondvibe_backend.repository.SizeRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ProductRepository productRepository;
    private final ClientRepository clientRepository;
    private final SizeRepository sizeRepository;
    private final ReservationMapper reservationMapper;

    public ReservationService(ReservationRepository reservationRepository, ProductRepository productRepository, ClientRepository clientRepository, SizeRepository sizeRepository, ReservationMapper reservationMapper) {
        this.reservationRepository = reservationRepository;
        this.productRepository = productRepository;
        this.clientRepository = clientRepository;
        this.sizeRepository = sizeRepository;
        this.reservationMapper = reservationMapper;
    }

    public String CreateReservation(CreateReservationRequest request) {
        Reservation reservation = reservationMapper.toReservation(request);
        for (ReservationItem item : reservation.getReservationItems()) {
            item.setReservation(reservation);
        }
        reservationRepository.save(reservation);
        return reservation.getId();
    }

//    @Scheduled(cron = "0 * * * * *")
    public void deleteReservation() {
        int currentMinute = LocalDateTime.now().getMinute();
        List<Reservation> ds = reservationRepository.findByEndMinute(currentMinute);
        reservationRepository.deleteAll(ds);
        System.out.println("Đã xóa " + ds.size() + " đơn giữ hàng lúc phút " + currentMinute);
    }
}
