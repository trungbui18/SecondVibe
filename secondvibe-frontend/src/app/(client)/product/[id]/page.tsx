"use client";
import productApi from "@/services/product";
import { Product } from "@/types/product";
import InforProduct from "./components/InforProduct";
import InforSeller from "./components/InforSeller";
import ProductImages from "@/components/client/product/ProductImages";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await params;
      console.log("slug: ", id);

      const idnew = Number(id);
      const response = await productApi.getProductById(idnew);
      setProduct(response.data);
    };
    fetchData();
  }, []);

  const handleSellerClick = () => {
    if (product?.seller) {
      router.push(`/profile/${product.seller}`);
    }
  };

  return (
    <div className="py-6 px-20">
      {product ? (
        <div className="space-y-6">
          {/* Product Information */}
          <div className="grid grid-cols-2 gap-6 w-full border border-gray-200 rounded shadow-lg border-t-1 p-6">
            <div className="col-span-1">
              <ProductImages images={product.images ?? []} />
            </div>
            <div className="col-span-1">
              <InforProduct Product={product} />
            </div>
          </div>
          {/* Seller Information */}
          <div
            onClick={handleSellerClick}
            className="w-full border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={product.imageSeller || "/default-avatar.png"}
                  alt={product.sellerName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.png";
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 hover:text-red-500 transition-colors duration-200">
                  {product.sellerName}
                </h3>

                <p className="text-sm text-gray-600"> Seller</p>
              </div>
              <div className="text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">Đang tải dữ liệu sản phẩm...</div>
      )}
    </div>
  );
}
