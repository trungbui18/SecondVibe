"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { ProductViewResponse, ProductInProfile } from "@/types/product";

interface Props {
  products: (ProductViewResponse | ProductInProfile)[];
  title?: string;
  showSellerInfo?: boolean;
}

export default function ProductList({
  products,
  title,
  showSellerInfo = true,
}: Props) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleToProfile = (sellerId: number) => {
    router.push(`/profile/${sellerId}`);
  };

  const handleToProductDetail = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Không có sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-xl mb-6 text-gray-500">
          {title} ({products.length} Products)
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => handleToProductDetail(product.id)}
          >
            {/* Product Image */}
            <div className="relative h-64 bg-gray-100">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "";
                }}
              />
              <div className="absolute top-2 left-2">
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {product.condition}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Seller Info - Only show if showSellerInfo is true and product has seller info */}
              {showSellerInfo && "sellerName" in product && (
                <div
                  className="flex items-center mb-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToProfile(product.seller);
                  }}
                >
                  <img
                    src={product.imageSeller || "/default-avatar.png"}
                    alt={product.sellerName}
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/default-avatar.png";
                    }}
                  />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {product.sellerName}
                    </p>
                    <p className="text-xs text-gray-500">Seller</p>
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-2">
                  <p className="text-green-600 font-bold text-lg">
                    {product.price?.toLocaleString("vi-VN")} ₫
                  </p>
                  {"brand" in product && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.brand}
                    </span>
                  )}
                </div>

                {"category" in product && "subCategory" in product && (
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{product.category}</span>
                    <span>{product.subCategory}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
