"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/client/layout/header/Header";
import Footer from "@/components/client/layout/footer/Footer";
import SearchInput from "@/components/ui/SearchInput";
import ListBrandNav from "@/components/client/brand/ListBrandNav";
import ProductList from "@/components/client/product/ProductList";
import { ProductViewResponse } from "@/types/product";
import productApi from "@/services/product";
import profileApi from "@/services/profile";
import { TopSellerResponse } from "@/types/profile";
import { Crown, Trophy } from "lucide-react";

export default function ClientPage() {
  const [products, setProducts] = useState<ProductViewResponse[] | []>([]);
  const [topSellers, setTopSellers] = useState<TopSellerResponse[]>([]);
  const router = useRouter();
  const fetchDataProducts = async () => {
    const res = await productApi.fetchTopProducts();
    setProducts(res.data);
  };
  const fetchTopSellers = async () => {
    const res = await profileApi.getTopSeller();
    setTopSellers(res.data);
  };
  useEffect(() => {
    fetchDataProducts();
    fetchTopSellers();
  }, []);
  return (
    <>
      <div className="px-16 mt-20">
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

        <div className="flex justify-between mt-12 mb-8">
          <h1 className="text-xl font-bold ">Trending</h1>
          <button
            className="text-xl  pr-10 text-green-500"
            onClick={() => {
              router.push("/see-all");
            }}
          >
            see more
          </button>
        </div>
        <ProductList products={products ?? []} />
      </div>
      <Footer />
    </>
  );
}
