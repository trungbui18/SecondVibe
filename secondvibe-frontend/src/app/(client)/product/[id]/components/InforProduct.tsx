"use client";
import React, { useState } from "react";
import { ProductSize } from "@/types/product";
import cartApi from "@/services/cart";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
interface ProductProp {
  id: number;
  name: string;
  description: string;
  status: string;
  price: number;
  condition: string;
  brand: string;
  seller: number;
  subCategory: string;
  productSizes: ProductSize[];
}

export default function InforProduct({ Product }: { Product: ProductProp }) {
  const [showMore, setShowMore] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const user = useSelector((state: RootState) => state.auth.user);
  const id = Number(user?.id);
  const toggleShow = () => setShowMore((prev) => !prev);
  const shortText = Product.description.slice(0, 50);
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(e.target.value);
  };

  const AddToCart = async () => {
    if (!selectedSize) {
      Swal.fire({
        toast: true,
        icon: "warning",
        position: "top-end",
        title: "Vui lòng chọn size trước khi thêm vào giỏ hàng!",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      return;
    }

    const ProductAddToCart = {
      idClient: id,
      productId: Product.id,
      sizeId: selectedSize,
      quantity: quantity,
    };

    try {
      const response = await cartApi.AddToCart(ProductAddToCart);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "🛒 Thêm vào giỏ hàng thành công!",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Lỗi thêm giỏ hàng:", error);
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra khi thêm vào giỏ hàng!",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-start gap-2">
        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded self-start">
          Love
        </span>
        <h1 className="text-xl font-bold leading-snug">{Product.name}</h1>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-2 gap-y-4 w-full max-w-md">
        <span className="font-medium text-lg">Condition:</span>
        <span className="text-left text-green-500 underline">
          {Product.condition}
        </span>

        <span className="font-medium text-lg">Brand:</span>
        <span className="text-left text-green-500 underline">
          {Product.brand}
        </span>

        <span className="font-medium text-lg">Category:</span>
        <span className="text-left text-green-500 underline">
          {Product.subCategory}
        </span>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Size</h3>
        <div className="flex flex-wrap gap-4">
          {Product.productSizes.map((size) => (
            <label key={size.sizeId} className="flex items-center gap-4">
              <input
                type="radio"
                name="size"
                value={size.sizeId}
                checked={selectedSize === size.sizeId}
                onChange={handleSizeChange}
                className="sr-only peer"
              />
              <div className="px-8 py-2 border border-gray-300 rounded-full cursor-pointer peer-checked:bg-green-100 peer-checked:border-green-500 peer-checked:text-green-700 transition">
                {size.sizeId}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex text-lg font-semibold mb-2">Quantity</h3>
        <div className="flex space-x-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 border rounded text-lg flex items-center justify-center"
            >
              −
            </button>

            <span className="text-lg">{quantity}</span>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-8 h-8 border rounded text-lg flex items-center justify-center"
            >
              +
            </button>
          </div>
          <button className="px-8 py-2 bg-red-500 text-white rounded-lg">
            Buy now
          </button>
          <button
            onClick={AddToCart}
            className="px-8 py-2 border text-black rounded-lg hover:text-green-600 hover:border-green-600"
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          <p>{showMore ? Product.description : `${shortText}...`}</p>
          <button
            onClick={toggleShow}
            className="text-green-600 font-medium mt-2 inline-block hover:underline"
          >
            {showMore ? "Show less" : "Read more"}
          </button>
        </div>
      </div>
    </div>
  );
}
