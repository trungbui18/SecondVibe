"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  SellerInCartResponse,
  CartDetail,
  CartDetailUpdateCreate,
} from "@/types/cartDetail";
import cartDetailApi from "@/services/cartDetail";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setSelectedItems } from "@/lib/redux/slice/cartSelectedSlice";
import SellerCartSection from "./components/SellerCartSection";
import Swal from "sweetalert2";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const id = user?.id;
  const MAX_ITEMS = 30;
  const timeoutRefs = useRef<Record<number, NodeJS.Timeout>>({});
  const [sellerInCart, setSellerInCart] = useState<SellerInCartResponse[]>([]);
  const [cartDetails, setCartDetails] = useState<CartDetail[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Đồng bộ cartDetails từ sellerInCart
  useEffect(() => {
    const allCartDetails = sellerInCart.flatMap((s) => s.cartDetails);
    setCartDetails(allCartDetails);
  }, [sellerInCart]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!id) return;
      try {
        const res = await cartDetailApi.getAllCartDetail(id);
        setSellerInCart(res.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy giỏ hàng:", err);
      }
    };
    fetchCart();
  }, [id]);
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      const res = await cartDetailApi.deleteListCartDetail(selectedIds);

      // Xóa xong thì làm mới lại dữ liệu giỏ hàng
      const updatedRes = await cartDetailApi.getAllCartDetail(id!);
      setSellerInCart(updatedRes.data);

      // Reset checkbox
      setSelectedIds([]);
      dispatch(setSelectedItems([]));
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    }
  };

  const handleDelete = async (idcdt: number) => {
    try {
      const res = await cartDetailApi.deleteCartDetail(idcdt);
      console.log("response: ", res.data);
      const updatedRes = await cartDetailApi.getAllCartDetail(id!);
      setSellerInCart(updatedRes.data);
      setSelectedIds([]);
      dispatch(setSelectedItems([]));
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    }
  };

  const handleQuantityChange = (
    sellerId: number,
    productId: number,
    type: "increase" | "decrease"
  ) => {
    setSellerInCart((prev) =>
      prev.map((seller) => {
        if (seller.id !== sellerId) return seller;

        const updatedDetails = seller.cartDetails.map((item) => {
          if (item.id !== productId) return item;

          const newQuantity =
            type === "increase"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);

          if (timeoutRefs.current[item.id]) {
            clearTimeout(timeoutRefs.current[item.id]);
          }

          timeoutRefs.current[item.id] = setTimeout(() => {
            const data: CartDetailUpdateCreate = {
              idCartDetail: item.id,
              quantity: newQuantity,
            };
            cartDetailApi
              .updateCartDetail(data)
              .then((res) => console.log("✅ Updated:", res))
              .catch((err) => console.error("❌ Update error:", err));
          }, 1000);

          return { ...item, quantity: newQuantity };
        });

        return { ...seller, cartDetails: updatedDetails };
      })
    );
  };

  const handleCheckboxChange = (item: CartDetail) => {
    setSelectedIds((prev) => {
      const newSelected = prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id];

      const selectedItems = sellerInCart
        .flatMap((s) => s.cartDetails)
        .filter((it) => newSelected.includes(it.id));

      dispatch(setSelectedItems(selectedItems));
      return newSelected;
    });
  };

  const handleCheckout = () => {
    const selectedItems = cartDetails.filter((item) =>
      selectedIds.includes(item.id)
    );

    if (selectedItems.length === 0) {
      return showAlert("Vui lòng chọn sản phẩm để thanh toán!", "warning");
    }

    if (selectedItems.length > MAX_ITEMS) {
      return showAlert(
        `Bạn chỉ có thể mua tối đa ${MAX_ITEMS} sản phẩm trong một lần thanh toán.`,
        "warning"
      );
    }

    dispatch(setSelectedItems(selectedItems));
    router.push("/checkout");
  };

  const showAlert = (
    message: string,
    icon: "warning" | "error" | "success"
  ) => {
    Swal.fire({
      icon,
      title: message,
      showConfirmButton: true,
    });
  };

  return (
    <div>
      <h2 className="text-xl py-6 text-center font-bold">Shopping Cart</h2>
      <p className="w-full border border-gray-200" />

      {sellerInCart.length === 0 ? (
        <p className="text-center mt-6">
          Không có sản phẩm nào trong giỏ hàng.
        </p>
      ) : (
        <>
          {" "}
          <div className="w-5/6 mx-auto space-y-8 mt-4">
            <SellerCartSection
              sellers={sellerInCart}
              selectedIds={selectedIds}
              onCheckboxChange={handleCheckboxChange}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDelete}
            />
          </div>
          <div className="w-full border-t mt-8 py-4 flex items-center justify-between px-6 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="w-4 h-4 accent-red-500"
                checked={
                  selectedIds.length === cartDetails.length &&
                  cartDetails.length > 0
                }
                onChange={(e) =>
                  setSelectedIds(
                    e.target.checked ? cartDetails.map((i) => i.id) : []
                  )
                }
              />
              <span className="text-sm">
                Chọn Tất Cả ({selectedIds.length})
              </span>
              <button
                onClick={handleDeleteSelected}
                className="text-sm text-gray-700 hover:underline"
              >
                Xóa
              </button>
              <button className="text-sm text-red-500 hover:underline">
                Lưu vào mục Đã thích
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm">
                  Tổng cộng (
                  <span className="font-medium">{selectedIds.length}</span> sản
                  phẩm):{" "}
                  <span className="text-red-500 text-xl font-bold">
                    {cartDetails
                      .filter((i) => selectedIds.includes(i.id))
                      .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                      .toLocaleString()}
                    ₫
                  </span>
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Mua Hàng
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
