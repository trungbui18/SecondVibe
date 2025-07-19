"use client";

import React from "react";
import { useBrands } from "@/hooks/useBrand";
import LoadingSpinner from "@/components/ui/LoadingSpinner ";
import { useRouter } from "next/navigation";

export default function ListBrandNav() {
  const { brands, isLoadingBrand, errorBrand } = useBrands();
  const router = useRouter();
  if (isLoadingBrand) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Popular Brands</h1>
      {errorBrand ? (
        <p className="text-red-500">Lỗi khi tải thương hiệu!</p>
      ) : (
        <div className="flex flex-wrap w-full space-x-10">
          {brands?.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col items-center w-24 cursor-pointer"
              onClick={() =>
                router.push(`/see-all?brand=${encodeURIComponent(brand.name)}`)
              }
            >
              <img
                src={brand.imageBrand}
                alt={brand.name}
                className="w-24 h-24 object-contain rounded-full shadow-md mb-2 transition-transform duration-300 hover:-translate-y-6"
              />

              <h2 className="font-semibold text-sm text-center">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
