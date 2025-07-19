"use client";
import {
  ShoppingBag,
  User,
  Package,
  Calendar,
  Receipt,
  Star,
  MapPin,
} from "lucide-react";
import { useOrdersBuyerResponse } from "@/hooks/useOrder";
import orderApi from "@/services/order";
import { useState, useMemo } from "react";
import MyPurchasesMenu from "./components/MyPurchasesMenu";
import RatingDialog from "./components/RatingDialog";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default function Component() {
  const { data, error, isLoading, mutate } = useOrdersBuyerResponse();
  const [selectedStatus, setSelectedStatus] = useState("DELIVERED");
  const router = useRouter();
  const [ratingDialog, setRatingDialog] = useState<{
    isOpen: boolean;
    orderDetailId: number;
    productId: number;
    productName: string;
    ratedUserId: number;
  }>({
    isOpen: false,
    orderDetailId: 0,
    productId: 0,
    productName: "",
    ratedUserId: 0,
  });

  // Lọc đơn hàng theo trạng thái
  const filteredOrders = useMemo(() => {
    if (!data) return [];
    if (selectedStatus === "COMPLETED") {
      return data.filter(
        (order) =>
          order.orderStatus === "COMPLETED" ||
          order.orderStatus === "PAID_TO_SELLER"
      );
    }
    return data.filter((order) => order.orderStatus === selectedStatus);
  }, [data, selectedStatus]);
  const handleOpenRatingDialog = (
    orderDetailId: number,
    productId: number,
    productName: string,
    ratedUserId: number
  ) => {
    setRatingDialog({
      isOpen: true,
      orderDetailId,
      productId,
      productName,
      ratedUserId,
    });
  };

  const handleCloseRatingDialog = () => {
    setRatingDialog({
      isOpen: false,
      orderDetailId: 0,
      productId: 0,
      productName: "",
      ratedUserId: 0,
    });
  };

  const handleConfirmedStatus = async (id: string) => {
    try {
      await orderApi.updateOrderStatus({ id, orderStatus: "COMPLETED" });
      await mutate();
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Comfirmed Successfully !`,
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    } catch (err) {
      alert("Cập nhật trạng thái thất bại!");
    }
  };

  const handleRatingSubmitted = () => {
    alert("Đánh giá đã được gửi thành công!");
  };

  if (isLoading) return <div>Đang tải đơn hàng...</div>;
  if (error) return <div>Đã có lỗi xảy ra khi tải đơn hàng.</div>;

  const ORDER_STATUS_MAP: Record<string, { label: string; color: string }> = {
    PENDING: { label: "PENDING", color: "bg-yellow-400 text-white" },
    PROCESSING: { label: "PROCESSING", color: "bg-cyan-500 text-white" },
    SHIPPING: { label: "SHIPPING", color: "bg-purple-500 text-white" },
    DELIVERED: { label: "DELIVERED", color: "bg-green-500 text-white" },
    CANCEL: { label: "CANCEL", color: "bg-red-500 text-white" },
    COMPLETED: { label: "COMPLETED", color: "bg-green-500 text-white" },
    PAID_TO_SELLER: { label: "COMPLETED", color: "bg-green-500 text-white" },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold">My Purchases</h1>
      <MyPurchasesMenu
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      <div className="mx-auto py-8">
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div>Không có đơn hàng nào.</div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-4"
                      onClick={() => {
                        router.push(`/profile/${order.idSeller}`);
                      }}
                    >
                      <div className="relative">
                        <img
                          src={
                            order.urlImage_seller ||
                            "/placeholder.svg?height=48&width=48"
                          }
                          alt={order.name_seller}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 p-1 bg-blue-500 rounded-full">
                          <User className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {order.name_seller}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>Seller</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            ORDER_STATUS_MAP[order.orderStatus]?.color ||
                            "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {ORDER_STATUS_MAP[order.orderStatus]?.label ||
                            order.orderStatus}
                        </span>
                        <div className="flex">
                          <Calendar className="h-4 w-4" />
                          <span>ID Order</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <p className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-full">
                          #{order.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-6">
                    {order.details.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <img
                                src={
                                  item.urlImage ||
                                  "/placeholder.svg?height=80&width=80"
                                }
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                              />
                              <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                                {item.quantity}
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-base mb-3 line-clamp-2">
                              {item.name}
                            </h4>

                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Size: {item.size}
                              </span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                SL: {item.quantity}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-600">
                                <span>
                                  {formatPrice(item.price)} × {item.quantity}
                                </span>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {index < order.details.length - 1 && (
                          <div className="mt-6 border-t border-gray-100"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-medium text-gray-900">
                        Tổng cộng đơn hàng:
                      </span>
                      <span className="text-xl font-bold text-red-500">
                        {formatPrice(
                          order.details.reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                        )}
                      </span>
                    </div>
                    {selectedStatus === "DELIVERED" && (
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="inline-flex items-center gap-2 px-4 py-2
                         bg-green-500 text-white rounded-md
                          hover:bg-yellow-600 transition-colors text-sm"
                          onClick={() => handleConfirmedStatus(order.id)}
                        >
                          Received
                        </button>
                      </div>
                    )}

                    {/* Rating Button for DELIVERED orders */}
                    {selectedStatus === "COMPLETED" && (
                      <div className="flex flex-wrap gap-2">
                        {(() => {
                          // Group items by productId to avoid duplicate rating buttons
                          const uniqueProducts = order.details.reduce(
                            (acc, item) => {
                              if (
                                !acc.find((p) => p.idProduct === item.idProduct)
                              ) {
                                acc.push(item);
                              }
                              return acc;
                            },
                            [] as typeof order.details
                          );

                          return uniqueProducts.map(
                            (item) =>
                              // Chỉ hiển thị button rating khi canRate là true
                              item.canRate && (
                                <button
                                  key={item.idProduct}
                                  onClick={() =>
                                    handleOpenRatingDialog(
                                      item.id, // orderDetailId
                                      item.idProduct,
                                      item.name,
                                      order.idSeller
                                    )
                                  }
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm"
                                >
                                  <Star className="h-4 w-4" />
                                  Rate {item.name.slice(0, 15)}...
                                </button>
                              )
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Rating Dialog */}
      <RatingDialog
        isOpen={ratingDialog.isOpen}
        onClose={handleCloseRatingDialog}
        orderDetailId={ratingDialog.orderDetailId}
        productId={ratingDialog.productId}
        productName={ratingDialog.productName}
        ratedUserId={ratingDialog.ratedUserId}
        onRatingSubmitted={handleRatingSubmitted}
      />
    </div>
  );
}
