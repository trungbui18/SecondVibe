"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrderDetailSeller } from "@/hooks/useOrderDetail";
import orderApi from "@/services/order";
import {
  Package,
  Calendar,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  User,
  XCircle,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";

export default function OrderDetailPage() {
  const params = useParams();
  const id = String(params.id);
  const { data: order, error, isLoading } = useOrderDetailSeller(id);

  const [status, setStatus] = useState<string>("");
  const [shippedDate, setShippedDate] = useState("");
  const ORDER_STATUS = [
    "PENDING",
    "PROCESSING",
    "SHIPPING",
    "DELIVERED",
    "PAID_TO_SELLER",
  ];

  const getNextStatus = (current: string) => {
    const idx = ORDER_STATUS.indexOf(current);
    if (idx !== -1 && idx < ORDER_STATUS.length - 1) {
      return ORDER_STATUS[idx + 1];
    }
    return null;
  };

  useEffect(() => {
    if (order?.orderStatus) {
      setStatus(order.orderStatus);
      setShippedDate(order.shippedDate);
    }
  }, [order]);

  const nextStatus = getNextStatus(status);

  const handleChangeStatus = async () => {
    if (nextStatus) {
      try {
        await orderApi.updateOrderStatus({ id, orderStatus: nextStatus });
        setStatus(nextStatus);
        if (nextStatus == "SHIPPING") {
          const now = new Date();

          const day = now.getDate();
          const month = now.getMonth() + 1;
          const year = now.getFullYear();

          setShippedDate(`${month}/${day}/${year}`);
        }
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Change Status ${nextStatus} Successfully !`,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
      } catch (err) {
        alert("Cập nhật trạng thái thất bại!");
      }
    }
  };

  const handleCancel = async () => {
    try {
      await orderApi.updateOrderStatus({ id, orderStatus: "CANCEL" });
      setStatus("CANCEL");
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Caneclled Order Successfully !`,
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    } catch (err) {
      alert("Hủy đơn thất bại!");
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Không thể tải chi tiết đơn hàng.
      </div>
    );
  if (!order) return <div className="p-8 text-center">Order not found.</div>;

  return (
    <div className="w-full mx-auto p-6 bg-gray-100 rounded-2xl shadow-lg border-t-2 border-gray-200">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 justify-center text-center">
        <Package className="w-7 h-7 text-primary text-center" />
        Order Details
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT: Products */}
        <div className="space-y-4 bg-white p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Product List</h2>
          {order.orderDetails.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-24 h-24 object-contain rounded-lg "
              />
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex gap-4 text-sm text-gray-700">
                  <p>
                    Size: <span className="font-medium">{item.size}</span>
                  </p>
                  <p>
                    Qty: <span className="font-medium">{item.quantity}</span>
                  </p>
                </div>
                <p className="text-sm">
                  Price:{" "}
                  <span className="font-bold text-primary ">
                    {item.price.toLocaleString("en-US")} VND
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Order Information */}
        <div className="space-y-4 text-gray-700 bg-white p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Order Information</h2>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Package size={18} />{" "}
              <span className="font-semibold">Order ID:</span> {order.id}
            </p>
            <p className="flex items-center gap-2">
              <Truck size={18} /> <span className="font-semibold">Status:</span>{" "}
              {status}
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={18} />{" "}
              <span className="font-semibold">Created At:</span>{" "}
              {order.createdAt || "Chưa có thông tin"}
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={18} />{" "}
              <span className="font-semibold">Received Date:</span>{" "}
              {order.receivedDate || "Chưa có thông tin"}
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={18} />{" "}
              <span className="font-semibold">Shipped Date:</span>{" "}
              {shippedDate || "Chưa có thông tin"}
            </p>
          </div>
          <div className="space-y-2 mt-4">
            <p className="flex items-center gap-2">
              <User size={18} />{" "}
              <span className="font-semibold">Recipient Name:</span>{" "}
              {order.fullName}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} /> <span className="font-semibold">Phone:</span>{" "}
              {order.phone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={18} />{" "}
              <span className="font-semibold">Address:</span>{" "}
              {order.shippingAddress}
            </p>
            <p className="flex items-center gap-2">
              <CreditCard size={18} />{" "}
              <span className="font-semibold">Payment:</span>{" "}
              {order.paymentMethod}
            </p>
            <p className="flex items-center gap-2">
              <Truck size={18} />{" "}
              <span className="font-semibold">Deal Method:</span>{" "}
              {order.dealMethod}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-lg font-bold text-primary text-red-500">
              Total: {order.totalAmount.toLocaleString("en-US")} VND
            </div>
            {status === "CANCEL" && (
              <div className="flex items-center gap-2 text-red-600 font-semibold">
                <XCircle size={24} /> Đã hủy
              </div>
            )}
            {["DELIVERED", "COMPLETED", "PAID_TO_SELLER"].includes(status) && (
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle size={24} /> Successfully !
              </div>
            )}
            {status !== "CANCEL" &&
              status !== "DELIVERED" &&
              status !== "PAID_TO_SELLER" && (
                <div className="flex gap-2">
                  {nextStatus && (
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-700 transition"
                      onClick={handleChangeStatus}
                    >
                      {nextStatus}
                    </button>
                  )}

                  {["PENDING", "PROCESSING", "SHIPPING"].includes(status) && (
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
