"use client";

import React from "react";
import { useProducts } from "@/hooks/useProduct";
import LoadingSpinner from "@/components/ui/LoadingSpinner ";
import Header from "@/components/layout/client/header/Header";
import Footer from "@/components/layout/client/footer/Footer";
import SearchInput from "@/components/ui/SearchInput";
import ListBrandNav from "@/components/layout/client/brand/ListBrandNav";
import ProductList from "@/components/layout/client/product/ProductList";
export default function ClientPage() {
  const { products, isLoading, error } = useProducts();

  return (
    <>
      <div className="px-16">
        <Header />
        <SearchInput />
        <div className="flex justify-between mt-4 mb-8 space-x-4 h-[350px]">
          <div className="w-3/5 h-full">
            <img
              src="./dongnhi.jpg"
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="w-2/5 flex flex-col space-y-2 h-full">
            <img
              src="./sale50.jpg"
              className="h-1/2 object-cover w-full rounded-md"
            />
            <img
              src="./trasua.jpg"
              className="h-1/2 object-cover w-full rounded-md"
            />
          </div>
        </div>
        <ListBrandNav />

        <h1 className="text-xl font-bold mt-8 mb-4">Trending</h1>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-red-500">Lỗi khi tải sản phẩm!</p>
        ) : (
          <ProductList products={products ?? []} />
        )}
      </div>
      <Footer />
    </>
  );
}
