import React from "react";
import { AllProductRejected } from "@/types/product";
import ProductImages from "@/components/client/product/ProductImages";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  product: AllProductRejected | null;
};

export default function Dialog({ open, onClose, product }: DialogProps) {
  if (!open || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 md:mx-0 md:w-3/4 lg:w-2/3 xl:w-1/2 h-[80vh] flex flex-col p-0 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // ← Chặn sự kiện từ bên trong
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold transition-colors z-10"
          aria-label="Đóng"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Cột ảnh */}
          <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-6 border-b md:border-b-0 md:border-r border-gray-100">
            <ProductImages images={product.images} />
          </div>

          {/* Cột thông tin */}
          <div className="md:w-1/2 w-full flex flex-col p-8 pt-20 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {product.name}
            </h2>
            <p className="text-gray-500 mb-1 text-sm">ID: {product.id}</p>
            <p className="text-xl text-red-600 font-semibold mb-2">
              Giá: {product.price?.toLocaleString()}₫
            </p>
            <p className="text-gray-600 mb-1">
              Trạng thái:{" "}
              <span className="font-medium text-yellow-600">
                {product.status}
              </span>
            </p>
            <p className="text-gray-600 mb-1">
              Số ảnh:{" "}
              <span className="font-medium">{product.images?.length ?? 0}</span>
            </p>
            <div className="mt-4">
              <p className="text-base font-semibold text-gray-700 mb-1">
                Lý do từ chối:
              </p>
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md">
                {product.rejectionReason}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
