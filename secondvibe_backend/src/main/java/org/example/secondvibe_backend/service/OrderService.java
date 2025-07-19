package org.example.secondvibe_backend.service;



import org.example.secondvibe_backend.dto.request.CreateOrderRequest;
import org.example.secondvibe_backend.dto.request.OrderDetailRequest;
import org.example.secondvibe_backend.dto.request.PaymentRequest;
import org.example.secondvibe_backend.dto.request.UpdateStatusOrderRequest;
import org.example.secondvibe_backend.dto.response.*;
import org.example.secondvibe_backend.entity.*;
import org.example.secondvibe_backend.entity.enums.OrderStatus;
import org.example.secondvibe_backend.entity.enums.ProductStatus;
import org.example.secondvibe_backend.entity.enums.Role;
import org.example.secondvibe_backend.entity.Payment;
import org.example.secondvibe_backend.exception.BaseException;
import org.example.secondvibe_backend.mapper.OrderDetailMapper;
import org.example.secondvibe_backend.mapper.OrderMapper;
import org.example.secondvibe_backend.mapper.PaymentMapper;
import org.example.secondvibe_backend.repository.*;
import org.example.secondvibe_backend.repository.PaymentRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class OrderService {
    private final ReservationRepository reservationRepository;
    private final ClientRepository clientRepository;
    private final AdministratorRepository administratorRepository;
    private final CartRepository cartRepository;
    private final OrderMapper orderMapper;
    private final OrderDetailMapper orderDetailMapper;
    private final OrderRepository orderRepository;
    private final WalletRepository walletRepository;
    private final ProductSizeRepository productSizeRepository;
    private final CartDetailRepository cartDetailRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final PaymentRepository paymentRepository;
    private final ProductRepository productRepository;
    private final RatingRepository ratingRepository;

    public OrderService(ReservationRepository reservationRepository, ClientRepository clientRepository, SizeRepository sizeRepository, AdministratorRepository administratorRepository, CartRepository cartRepository, OrderMapper orderMapper, OrderDetailMapper orderDetailMapper, OrderRepository orderRepository, PaymentMapper paymentMapper, ReservationItemRepository reservationItemRepository, OrderDetailRepository orderDetailRepository, WalletRepository walletRepository, ProductSizeRepository productSizeRepository, CartDetailRepository cartDetailRepository, OrderDetailRepository orderDetailRepository1, PaymentRepository paymentRepository, ProductRepository productRepository, RatingRepository ratingRepository) {
        this.reservationRepository = reservationRepository;
        this.administratorRepository = administratorRepository;
        this.clientRepository = clientRepository;
        this.cartRepository = cartRepository;
        this.orderMapper = orderMapper;
        this.orderDetailMapper = orderDetailMapper;
        this.orderRepository = orderRepository;
        this.walletRepository = walletRepository;

        this.productSizeRepository = productSizeRepository;
        this.cartDetailRepository = cartDetailRepository;
        this.orderDetailRepository = orderDetailRepository1;
        this.paymentRepository = paymentRepository;
        this.productRepository = productRepository;
        this.ratingRepository = ratingRepository;
    }

    private void updateIncomeAdmin(double fee){
        Role role = Role.ADMINISTRATOR;
        Administrator admin=administratorRepository.findByAccount_Role(role).orElseThrow(()->new BaseException("KO tìm thấy admin"));
        Wallet wallet=walletRepository.findByAdministrator_Id(admin.getId()).orElseThrow(()->new BaseException("Not found admin"));
        wallet.setBalance(wallet.getBalance()+fee);
        walletRepository.save(wallet);
    }



    public int countOrders(){
        LocalDate today=LocalDate.now();
        LocalDate sevenDayAgo=LocalDate.now().minusDays(6);
        List<OrderStatus> statuses = List.of(OrderStatus.COMPLETED, OrderStatus.PAID_TO_SELLER);
        int count = orderRepository.countByStatusesAndReceivedDateBetween(statuses, sevenDayAgo, today);
        return count;
    }

    public double getRevenuePlatform(){
        LocalDate today=LocalDate.now();
        OrderStatus status=OrderStatus.COMPLETED;
        OrderStatus status2=OrderStatus.PAID_TO_SELLER;
        Double revenue=orderRepository.getRevenue(today,status,status2);
        return revenue!=null?revenue:0;
    }
    public double getRevenueAdmin(){
        Role role = Role.ADMINISTRATOR;
        Administrator admin=administratorRepository.findByAccount_Role(role).orElseThrow(()->new BaseException("KO tìm thấy admin"));
        Wallet wallet=walletRepository.findByAdministrator_Id(admin.getId()).orElseThrow(()->new BaseException("Not found admin"));
        return wallet.getBalance();
    }

    public List<TopSellerResponse> getTopSellers(int topN) {
        Pageable pa=PageRequest.of(0,topN);
        return orderDetailRepository.findTopSellersByOrderCount(pa);
    }

    public List<ProductViewResponse> getTopOrderedProducts() {
        List<Object[]> results = orderDetailRepository.findTopProductsByOrderCount();

        return results.stream()
                .map(obj -> (Product) obj[0])
                .filter(product -> product.getStatus() == ProductStatus.APPROVED)
                .map(product -> new ProductViewResponse(
                        product.getId(),
                        product.getName(),
                        product.getDescription(),
                        product.getPrice(),
                        product.getCreatedAt(),
                        product.getStatus(),
                        product.getSeller().getId(),
                        product.getSeller().getFullName(),
                        product.getSeller().getAvatar(),
                        product.getCondition().getDescription(),
                        product.getBrand().getName(),
                        product.getSubCategory().getName(),
                        product.getSubCategory().getCategory().getName(),
                        product.getImages() != null && !product.getImages().isEmpty()
                                ? product.getImages().get(0).getUrlImage()
                                : null
                ))
                .collect(Collectors.toList());
    }


    public List<AllOrdersSellerResponse> AllOrderSeller(int idSeller){
        List<Order> Orders=orderRepository.findAllBySeller_Id(idSeller);
        return Orders.stream().map(orderMapper::toOrdersSellerResponse).toList();
    }

    public List<OrderBuyerResponse> AllOrderBuyer(int idBuyer){
        List<Order> Orders=orderRepository.findAllByClient_Id(idBuyer);
        List<OrderBuyerResponse> responses = orderMapper.toOrderBuyerResponses(Orders);
        return responses;
    }
    public List<OrderStatusCountResponse> getOrderStatusCounts() {
        List<OrderStatusCountResponse> statusCounts = new ArrayList<>();
        Long pendingCount = orderRepository.countByOrderStatus(OrderStatus.PENDING);
        Long processingCount = orderRepository.countByOrderStatus(OrderStatus.PROCESSING);
        Long shippingCount = orderRepository.countByOrderStatus(OrderStatus.SHIPPING);
        Long deliveredCount = orderRepository.countByOrderStatus(OrderStatus.DELIVERED);
        Long cancelCount = orderRepository.countByOrderStatus(OrderStatus.CANCEL);
        Long completedCount = orderRepository.countByOrderStatus(OrderStatus.COMPLETED);
        Long paid = orderRepository.countByOrderStatus(OrderStatus.PAID_TO_SELLER);
        statusCounts.add(new OrderStatusCountResponse("Chờ xác nhận", pendingCount));
        statusCounts.add(new OrderStatusCountResponse("Đang xử lý", processingCount));
        statusCounts.add(new OrderStatusCountResponse("Đang giao", shippingCount));
        statusCounts.add(new OrderStatusCountResponse("Đã giao", deliveredCount));
        statusCounts.add(new OrderStatusCountResponse("Đã hủy", cancelCount));
        statusCounts.add(new OrderStatusCountResponse("Hoàn thành", completedCount+paid));

        return statusCounts;
    }



    public boolean cancelledOrder(String idOrder,int idUser){
        Order o=orderRepository.findById(idOrder).orElseThrow(()->new BaseException("Not found Order"));
        if(o.getOrderStatus()!=OrderStatus.PROCESSING||o.getOrderStatus()!=OrderStatus.PENDING){
            return false;
        }
        o.setOrderStatus(OrderStatus.CANCEL);
        orderRepository.save(o);
        return true;
    }


    public String udpateStatusOrder(UpdateStatusOrderRequest request){
        try {
            Order order=orderRepository.findById(request.getId()).orElseThrow(()->new BaseException("Ko tim thay don hang"));
            order.setOrderStatus(request.getOrderStatus());
            if(request.getOrderStatus()==OrderStatus.SHIPPING){
                order.setShippedDate(LocalDate.now());
            }
            if(request.getOrderStatus()==OrderStatus.COMPLETED){
                order.setReceivedDate(LocalDate.now());
            }
            orderRepository.save(order);
            return request.getOrderStatus().toString();
        } catch (BaseException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public Map<String, Object> createOrderPay(int idUser,PaymentRequest paymentRequest) {
        List<Integer> success = new ArrayList<>();
        List<Integer> fail = new ArrayList<>();
        Reservation reservation = reservationRepository.findById(paymentRequest.getIdReservation())
                .orElseThrow(() -> new BaseException("Không tìm thấy reservation"));
        System.out.println(">>> Reservation ID: " + reservation.getId());

        List<ReservationItem> reservationItems = reservation.getReservationItems();
        if (reservationItems.isEmpty()) {
            throw new BaseException("Reservation không có sản phẩm nào!");
        }

        Map<Integer, List<ReservationItem>> groupBySeller = reservationItems.stream()
                .collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));

        System.out.println(">>> groupBySeller size: " + groupBySeller.size());

        for (Map.Entry<Integer, List<ReservationItem>> entry : groupBySeller.entrySet()) {
            try {
                Integer sellerId = entry.getKey();
                List<ReservationItem> sellerItems = entry.getValue();
                System.out.println(">>> Creating order for sellerId: " + sellerId + " with " + sellerItems.size() + " items");

                // Tạo Order mới
                Order order = new Order();
                order.setShippingAddress(reservation.getShippingAddress());
                order.setDealMethod(reservation.getDealMethod());
                order.setFullName(reservation.getFullName());
                order.setPhone(reservation.getPhone());
                order.setPaymentMethod(reservation.getPaymentMethod());
                order.setOrderStatus(OrderStatus.PENDING);
                order.setCreatedAt(LocalDate.now());
                order.setTotalAmount(0);

                // set client là seller
                Client cli = clientRepository.findById(idUser).orElseThrow(()->new BaseException("Ko tim thay client"));
                Client seller=sellerItems.get(0).getProduct().getSeller();
                order.setSeller(seller);
                order.setClient(cli);

                List<OrderDetail> orderDetails = new ArrayList<>();
                double totalAmount = 0;

                for (ReservationItem item : sellerItems) {
                    ProductSize ps = productSizeRepository
                            .findByProduct_IdAndAndSize_Id(item.getProduct().getId(), item.getSize().getId())
                            .orElseThrow(() -> new BaseException("Không tìm thấy tồn kho sản phẩm"));

                    if (ps.getQuantity() < item.getQuantity()) {
                        throw new BaseException("Sản phẩm " + item.getProduct().getName()
                                + " size " + item.getSize().getId() + " không đủ hàng");
                    }

                    ps.setQuantity(ps.getQuantity() - item.getQuantity());
                    productSizeRepository.save(ps);

                    // tạo order detail
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setOrder(order);
                    orderDetail.setProduct(item.getProduct());
                    orderDetail.setSize(item.getSize());
                    orderDetail.setQuantity(item.getQuantity());
                    orderDetail.setPrice(item.getPrice());

                    orderDetails.add(orderDetail);
                    totalAmount += orderDetail.getQuantity() * orderDetail.getPrice();
                }

                order.setOrderDetails(orderDetails);
                order.setTotalAmount(totalAmount);

                // lưu order
                orderRepository.save(order);
                System.out.println(">>> Order saved for sellerId: " + sellerId + " - orderId: " + order.getId());
                
                // Tạo và lưu Payment
                Payment payment = new Payment();
                payment.setCodePaymet(paymentRequest.getCodePaymet());
                payment.setAmount(totalAmount);
                payment.setDate(paymentRequest.getDate());
                payment.setStatus(paymentRequest.getStatus());
                payment.setOrder(order);
                paymentRepository.save(payment);
                System.out.println(">>> Payment saved for orderId: " + order.getId() + " - paymentId: " + payment.getId());
                
                // Flush để đảm bảo dữ liệu được lưu ngay lập tức
                paymentRepository.flush();
                orderRepository.flush();

                // Xóa CartDetail tương ứng với các sản phẩm vừa tạo đơn hàng
                Client client =clientRepository.findById(idUser).orElseThrow(()->new BaseException("Ko tim thay client"));
                Cart cart = cartRepository.findByClientId(client.getId())
                        .orElse(null);
                if (cart != null) {
                    for (ReservationItem item : sellerItems) {
                        CartDetail cartDetail = cartDetailRepository.findByCartAndProduct_IdAndSize_Id(
                                cart, item.getProduct().getId(), item.getSize().getId());
                        if (cartDetail != null) {
                            cartDetailRepository.delete(cartDetail);
                        }
                    }
                    cartDetailRepository.flush();
                }
                cart.setQuantity(cart.getQuantity()-sellerItems.size());
                cartRepository.save(cart);

                success.add(sellerId);
            } catch (Exception e) {
                e.printStackTrace();
                fail.add(entry.getKey());
                continue;
            }
        }
        updateIncomeAdmin(paymentRequest.getAmount());
        Map<String, Object> result = new HashMap<>();
        result.put("success", success);
        result.put("fail", fail);
        return result;
    }


    @Transactional
    public List<OrderResponse> createOrderCOD(int idUser, CreateOrderRequest request) {
        System.out.println("[createOrderCOD] idUser: " + idUser);
        System.out.println("[createOrderCOD] request: " + request);

        Client client = clientRepository.findById(idUser)
                .orElseThrow(() -> new BaseException("Không tìm thấy user"));

        // nhóm theo seller
        Map<Integer, List<OrderDetailRequest>> groupBySeller = request.getOrderDetails().stream()
                .collect(Collectors.groupingBy(odt -> {
                    ProductSize ps = productSizeRepository
                            .findByProduct_IdAndAndSize_Id(odt.getProductId(), odt.getSizeId())
                            .orElseThrow(() -> new BaseException("Không tìm thấy sản phẩm cần mua"));
                    return ps.getProduct().getSeller().getId();
                }));

        System.out.println("[createOrderCOD] groupBySeller size: " + groupBySeller.size());
        List<OrderResponse> orderResponses = new ArrayList<>();

        for (Map.Entry<Integer, List<OrderDetailRequest>> entry : groupBySeller.entrySet()) {
            Integer sellerId = entry.getKey();
            List<OrderDetailRequest> sellerOrderDetails = entry.getValue();
            System.out.println("[createOrderCOD] Creating order for sellerId: " + sellerId + " with " + sellerOrderDetails.size() + " items");

            // Tạo Order mới bằng MapStruct
            Order order = orderMapper.createOrderRequestToOrder(request);
            order.setClient(client);
            order.setOrderStatus(OrderStatus.PENDING);
            order.setCreatedAt(LocalDate.now());
            order.setTotalAmount(0);
            Product p=productRepository.findById(sellerOrderDetails.get(0).getProductId()).orElseThrow(()->new BaseException("ko tim thay san pham"));
            Client seller=p.getSeller();
            order.setSeller(seller);
            List<OrderDetail> orderDetails = new ArrayList<>();

            for (OrderDetailRequest odt : sellerOrderDetails) {
                ProductSize ps = productSizeRepository
                        .findByProduct_IdAndAndSize_Id(odt.getProductId(), odt.getSizeId())
                        .orElseThrow(() -> new BaseException("Không tìm thấy sản phẩm cần mua"));

                if (ps.getQuantity() < odt.getQuantity()) {
                    throw new BaseException("Sản phẩm "
                            + odt.getProductId() + " size "
                            + odt.getSizeId() + " không đủ hàng");
                }

                // Giảm tồn kho
                ps.setQuantity(ps.getQuantity() - odt.getQuantity());
                productSizeRepository.save(ps);

                // Kiểm tra xem đã có OrderDetail cho productId và sizeId này chưa
                OrderDetail existingDetail = orderDetails.stream()
                        .filter(od -> od.getProduct() != null
                                && od.getProduct().getId() == odt.getProductId()
                                && od.getSize() != null
                                && od.getSize().getId().equals(odt.getSizeId()))
                        .findFirst().orElse(null);
                if (existingDetail != null) {
                    int newQuantity = existingDetail.getQuantity() + odt.getQuantity();
                    if (newQuantity > 0) {
                        existingDetail.setQuantity(newQuantity);
                        existingDetail.setPrice(ps.getProduct().getPrice());
                    } else {
                        orderDetails.remove(existingDetail);
                    }
                } else {
                    // Nếu chưa có, tạo mới bằng MapStruct
                    OrderDetail orderDetail = orderDetailMapper.toOrderDetail(odt);
                    orderDetail.setOrder(order);
                    orderDetail.setProduct(ps.getProduct());
                    orderDetail.setSize(ps.getSize());
                    orderDetail.setPrice(ps.getProduct().getPrice());
                    orderDetails.add(orderDetail);
                    System.out.println("[createOrderCOD] Added OrderDetail: productId=" + ps.getProduct().getId() + ", sizeId=" + ps.getSize().getId() + ", quantity=" + orderDetail.getQuantity() + ", price=" + orderDetail.getPrice());
                }
            }

            // Tính lại tổng tiền
            double totalAmount = orderDetails.stream().mapToDouble(od -> od.getQuantity() * od.getPrice()).sum();
            order.setOrderDetails(orderDetails);
            order.setTotalAmount(totalAmount);
            orderRepository.save(order);
            orderRepository.flush();
            System.out.println("[createOrderCOD] Order saved: orderId=" + order.getId() + ", totalAmount=" + order.getTotalAmount());

            // Trả về OrderResponse bằng MapStruct
            OrderResponse response = orderMapper.toOrderResponse(order);
            orderResponses.add(response);

            // Xóa CartDetail tương ứng với các sản phẩm vừa tạo đơn hàng
            Cart cart = cartRepository.findByClientId(client.getId()).orElse(null);
            if (cart != null) {
                int removedCount = 0;
                Iterator<CartDetail> iterator = cart.getCartDetails().iterator();
                while (iterator.hasNext()) {
                    CartDetail cd = iterator.next();
                    for (OrderDetailRequest odt : sellerOrderDetails) {
                        if (cd.getProduct().getId() == odt.getProductId() &&
                                cd.getSize().getId().equals(odt.getSizeId())) {
                            iterator.remove();
                            removedCount++;
                            break;
                        }
                    }
                }

                cart.setQuantity(cart.getQuantity() - removedCount);

                if (cart.getQuantity() <= 0) {
                    cartRepository.delete(cart);
                } else {
                    cartRepository.save(cart);
                }

                cartRepository.flush(); // flush đúng chỗ luôn
            }
        }

        try {
            orderRepository.flush();
            System.out.println("[createOrderCOD] Flushed orderRepository thành công!");
        } catch (Exception ex) {
            System.out.println("[createOrderCOD][ERROR] Lỗi khi flush orderRepository: " + ex.getMessage());
            ex.printStackTrace();
            throw ex;
        }

        System.out.println("[createOrderCOD] Done. Orders created successfully.");
        return orderResponses;
    }

    public Map<String, Object> getSellerStats(int sellerId) {
        Map<String, Object> stats = new HashMap<>();
        List<Order> orders = orderRepository.findAllBySeller_Id(sellerId);
        double revenue = (orders.stream().mapToDouble(Order::getTotalAmount).sum())*90/100;
        String formattedRevenue = String.format("%.0f", revenue);
        stats.put("revenue", formattedRevenue);
        long productCount = productRepository.findAll().stream()
                .filter(p -> p.getSeller().getId() == sellerId && p.getStatus() != null && p.getStatus().name().equalsIgnoreCase("APPROVED"))
                .count();
        stats.put("product", productCount);
        stats.put("order", orders.size());
        List<Integer> clientIds = new ArrayList<>();
        for (Order order : orders) {
            if (order.getClient() != null) {
                clientIds.add(order.getClient().getId());
            }
        }
        long uniqueClients = clientIds.stream().distinct().count();
        stats.put("client", uniqueClients);
        return stats;
    }

    public List<AllOrdersSellerResponse> getSellerRecentOrders(int sellerId) {
        List<Order> orders = orderRepository.findTop5BySeller_IdOrderByCreatedAtDesc(sellerId);
        return orders.stream().map(orderMapper::toOrdersSellerResponse).toList();
    }

    public List<Map<String, Object>> getSellerMonthlyStats(int sellerId) {
        List<Order> orders = orderRepository.findAllBySeller_Id(sellerId);
        Map<Integer, Double> revenueByMonth = new HashMap<>();
        Map<Integer, Integer> orderCountByMonth = new HashMap<>();
        for (Order order : orders) {
            if (order.getCreatedAt() != null) {
                int month = order.getCreatedAt().getMonthValue();
                revenueByMonth.put(month, revenueByMonth.getOrDefault(month, 0.0) + order.getTotalAmount());
                orderCountByMonth.put(month, orderCountByMonth.getOrDefault(month, 0) + 1);
            }
        }
        List<Map<String, Object>> result = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            Map<String, Object> obj = new HashMap<>();
            obj.put("month", "T" + month);
            obj.put("revenue", String.format("%.0f", revenueByMonth.getOrDefault(month, 0.0)));
            obj.put("orders", orderCountByMonth.getOrDefault(month, 0));
            result.add(obj);
        }
        return result;
    }

}
