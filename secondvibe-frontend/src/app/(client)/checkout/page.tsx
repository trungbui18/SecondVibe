"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutSummary from "./components/CheckoutSummary";
import MethodSelection from "./components/MethodSelection";
import AddressForm from "./components/AddressForm";
import reservationApi from "@/services/reservation";
import orderApi from "@/services/order";
import Swal from "sweetalert2";
import axios from "axios";

export default function CheckoutPage() {
  const router = useRouter();
  const selectedItems = useSelector((state: RootState) => state.cartSelected);
  const user = useSelector((state: RootState) => state.auth.user);
  const id = user?.id;
  const [inforClient, setInforClient] = useState<{
    fullAddress: string;
    fullName: string;
    phone: string;
  }>();

  const [dealMethod, setDealMethod] = useState<"DELIVERY" | "MEETUP">(
    "DELIVERY"
  );
  const [paymentMethod, setPaymentMethod] = useState<"VNPAY" | "COD">("VNPAY");
  const [checkErrorItems, setCheckErrorItems] = useState<any[]>([]);

  const handleSubmitOrder = async () => {
    const totalAmount = selectedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    if (
      !inforClient?.fullAddress.trim() ||
      !inforClient?.fullName.trim() ||
      !inforClient?.phone.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin!",
        text: "Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ.",
      });
      return;
    }

    // Check multi quantity before placing order
    const checkItems = selectedItems.map((item) => ({
      productId: item.idProduct,
      quantity: item.quantity,
      sizeId: item.size,
      price: item.price,
    }));
    try {
      const checkRes = await axios.post(
        "http://localhost:8080/product/public/check_multi_quantity",
        { items: checkItems }
      );
      if (Array.isArray(checkRes.data.data) && checkRes.data.data.length > 0) {
        const displayedItems = checkRes.data.data.slice(0, 2).join(", ");
        const isMore = checkRes.data.data.length > 2;

        Swal.fire({
          icon: "warning",
          title: "Các sản phẩm không đủ số lượng!",
          text: isMore ? `${displayedItems}, ...` : displayedItems,
        });
        return;
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Lỗi kiểm tra số lượng sản phẩm!",
        text: "Vui lòng thử lại sau.",
      });
      return;
    }

    const commonPayload = {
      shippingAddress: inforClient.fullAddress,
      fullName: inforClient.fullName,
      phone: inforClient.phone,
      totalAmount,
      dealMethod,
      paymentMethod,
    };

    const items = selectedItems.map((item) => ({
      productId: item.idProduct,
      quantity: item.quantity,
      sizeId: item.size,
      price: item.price,
    }));

    try {
      if (paymentMethod === "VNPAY") {
        const userId = id!;
        const payload = {
          ...commonPayload,
          userId,
          reservationItems: items,
        };
        const res = await reservationApi.CheckOut(payload);
        if (res.data) {
          window.location.href = res.data;
        } else {
          router.push("/");
          Swal.fire({
            title: "🎉 Đặt hàng thành công!",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            backdrop: true,
            showConfirmButton: false,
            background: "#fffff",
          });
        }
      } else {
        const order = {
          ...commonPayload,
          orderDetails: items,
        };
        await orderApi.createOrderCod(order);
        router.push("/");
        Swal.fire({
          title: "🎉 Đặt hàng thành công!",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          backdrop: true,
          showConfirmButton: false,
          background: "#fffff",
        });
      }
    } catch (err) {
      console.error("Checkout error:", err);
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: "Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <div className="w-full flex mx-auto p-6 grid-cols-3 gap-6">
      <div className="w-full col-span-2 space-y-6 h-fit">
        <AddressForm onChange={setInforClient} />
        <MethodSelection
          dealMethod={dealMethod}
          paymentMethod={paymentMethod}
          onSelectDealMethod={setDealMethod}
          onSelectPaymentMethod={setPaymentMethod}
        />
      </div>
      <div className="col-span-1 space-y-6">
        <CheckoutSummary items={selectedItems} onCheckout={handleSubmitOrder} />
      </div>
    </div>
  );
}
