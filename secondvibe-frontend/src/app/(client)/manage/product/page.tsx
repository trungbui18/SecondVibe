"use client";
import React, { useEffect, useState } from "react";
import { useMyProducts } from "@/hooks/useProduct";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const { products, error, isLoading } = useMyProducts();

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi khi tải dữ liệu: {error.message}</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
              ID
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
              Image
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
              Quantity
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
              Created At
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products?.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{product.id}</td>
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3">
                <img
                  src={product.img || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 rounded object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </td>
              <td className="px-4 py-3">{product.price.toLocaleString()} đ</td>
              <td className="px-4 py-3">{product.quantity}</td>
              <td className="px-4 py-3">{product.createdAt}</td>
              <td className="px-4 py-3">
                <button
                  className="inline-flex items-center px-3 py-1 rounded-xl
                 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold
                  shadow transition-all duration-200"
                  onClick={() => {
                    router.push(`/manage/product/${product.id}`);
                  }}
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
