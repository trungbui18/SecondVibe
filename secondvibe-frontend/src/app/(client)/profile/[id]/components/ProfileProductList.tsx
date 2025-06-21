import React from "react";
import { ProductInProfile } from "@/types/product";

export default function ProfileProductList({
  products,
}: {
  products: ProductInProfile[];
}) {
  return (
    <div className="bg-white border-gray-200 border-2 p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Listings</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white text-black border border-gray-400 rounded-md overflow-hidden relative"
          >
            <div className="relative">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-60 object-contain"
              />
            </div>
            <div className="p-2 space-y-1">
              <p className="text-sm line-clamp-1">{product.name}</p>
              <p className="font-semibold">
                {product.price.toLocaleString()} VNĐ
              </p>
              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-gray-400">{product.condition}</p>
                <button className="text-black text-xl justify-end">⋮</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
