import React from "react";
import { ProductInProfile } from "@/types/product";
import ProductList from "@/components/client/product/ProductList";

export default function ProfileProductList({
  products,
}: {
  products: ProductInProfile[];
}) {
  return (
    <div className="bg-white border-gray-200 border-2 p-6 rounded-lg">
      <ProductList
        products={products}
        title="Listings"
        showSellerInfo={false}
      />
    </div>
  );
}
