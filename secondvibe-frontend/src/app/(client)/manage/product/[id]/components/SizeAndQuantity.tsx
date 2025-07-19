import React from "react";
import { Trash2 } from "lucide-react";
import { ProductSize } from "@/types/product";

export default function SizeAndQuantity({
  productSize,
  onChange,
  onRemove,
}: {
  productSize: ProductSize[];
  onChange: (index: number, field: keyof ProductSize, value: any) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Sizes & Inventory
        </h2>
      </div>

      <div className="space-y-4">
        {productSize?.map((size, index) => (
          <div
            key={size.sizeId}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <input
                type="text"
                value={size.sizeId}
                onChange={(e) => onChange(index, "sizeId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="0"
                value={size.quantity}
                onChange={(e) =>
                  onChange(index, "quantity", Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
