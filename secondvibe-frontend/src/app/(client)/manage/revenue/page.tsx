"use client";
import React, { useState } from "react";
import ProductImages from "@/components/client/product/ProductImages";
import { useMyProductsRejected } from "@/hooks/useProduct";
import Dialog from "./components/Dialog";
import { AllProductRejected } from "@/types/product";

export default function Page() {
  const { products, error, isLoading } = useMyProductsRejected();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<AllProductRejected | null>(null);

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Đã xảy ra lỗi khi tải sản phẩm.</div>;
  if (!products || products.length === 0)
    return <div>Không có sản phẩm bị từ chối.</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-xl shadow-md p-4 max-w-md"
          >
            <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              1/{product.images?.length ?? 0}
            </div>

            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded font-semibold">
              Rejected
            </div>

            <div className="relative group mt-6 w-full h-60 rounded-md overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0].urlImage}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}

              {/* Nút hiển thị khi hover */}
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setOpenDialog(true);
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Xem chi tiết
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              {/* <p className="text-sm text-gray-600">ID: {product.id}</p> */}
              <p className="text-xl text-red-600 font-bold mt-1">
                {product.price?.toLocaleString()}đ
              </p>
              <p className="text-sm text-gray-600">
                {product.images?.length ?? 0} ảnh
              </p>

              {/* Lý do từ chối */}
              <div className="mt-3">
                <p className="text-sm font-medium">Lý do từ chối:</p>
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md mt-1">
                  {product.rejectionReason}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        product={selectedProduct}
      />
    </>
  );
}
