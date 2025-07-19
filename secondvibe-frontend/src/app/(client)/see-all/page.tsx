"use client";
import React from "react";
import { useProducts, useProductsByBrand } from "@/hooks/useProduct";
import ProductList from "@/components/client/product/ProductList";
import { useSearchParams } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const { products, error, isLoading } = brand
    ? useProductsByBrand(brand)
    : useProducts();
  return (
    <div className="mt-8">
      <h1 className="font-bold text-2xl mb-4">All Products</h1>
      <ProductList products={products ?? []} />
    </div>
  );
}
