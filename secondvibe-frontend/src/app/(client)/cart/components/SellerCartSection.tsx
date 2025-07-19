"use client";
import React from "react";
import { SellerInCartResponse, CartDetail } from "@/types/cartDetail";

interface Props {
  sellers: SellerInCartResponse[];
  selectedIds: number[];
  onCheckboxChange: (item: CartDetail) => void;
  onQuantityChange: (
    sellerId: number,
    productId: number,
    type: "increase" | "decrease"
  ) => void;
  onDelete: (cartDetailId: number) => void; // 👈 thêm dòng này
}

export default function SellerCartSection({
  sellers,
  selectedIds,
  onCheckboxChange,
  onQuantityChange,
  onDelete,
}: Props) {
  return (
    <>
      {sellers.map((seller) => (
        <div key={seller.id} className=" p-4 rounded shadow-sm">
          <div className="flex items-center mb-4 gap-4">
            <img
              src={seller.urlImage || "/default-avatar.png"}
              alt={seller.name}
              onError={(e) => {
                e.currentTarget.src = "/default-avatar.png";
              }}
              className="w-10 h-10 rounded-full object-cover"
            />
            <h3 className="font-semibold text-lg">{seller.name}</h3>
          </div>

          <ul className="space-y-4">
            {seller.cartDetails.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-10 gap-4 items-center border border-gray-200 shadow py-4 px-2"
              >
                <div className="col-span-1 flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-red-500"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => onCheckboxChange(item)}
                  />
                </div>

                <img
                  src={item.urlImage}
                  alt={item.name}
                  className="col-span-2 w-30 h-30 object-cover"
                />

                <div className="col-span-2">
                  <h3 className="font-medium line-clamp-2">{item.name}</h3>
                </div>

                <div className="col-span-1 text-center">
                  <p className="text-gray-500 font-semibold">{item.size}</p>
                </div>

                <div className="col-span-1 text-center">
                  <p className="text-red-500 font-semibold">
                    {item.price.toLocaleString()}₫
                  </p>
                </div>

                <div className="col-span-1 flex items-center justify-center">
                  <button
                    className="border px-2"
                    onClick={() =>
                      onQuantityChange(seller.id, item.id, "decrease")
                    }
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-10 text-center border-t border-b"
                  />
                  <button
                    className="border px-2"
                    onClick={() =>
                      onQuantityChange(seller.id, item.id, "increase")
                    }
                  >
                    +
                  </button>
                </div>

                <p className="col-span-1 text-right text-red-500 font-bold">
                  {(item.quantity * item.price).toLocaleString()}₫
                </p>

                <div className="col-span-1 flex justify-center items-center">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => onDelete(item.id)}
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
