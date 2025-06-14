"use client";
import React, { useState } from "react";
import UploadImages from "./components/UploadImages";
import ProductForm from "./components/ProductForm";
import { ProductSize } from "@/types/product";
import productApi from "@/services/product";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    seller: 0,
    condition: 0,
    brand: 0,
    subCategory: 0,
    productSizes: [] as ProductSize[],
  });

  const [images, setImages] = useState<File[]>([]);
  const [coverIndex, setCoverIndex] = useState<number>(0);
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    // Chuyển đổi giá trị cho các trường số
    let parsedValue: string | number;
    if (name === "price") {
      parsedValue = parseFloat(value) || 0; // Chuyển thành số thực
    } else if (
      name === "condition" ||
      name === "brand" ||
      name === "subCategory" ||
      name === "seller"
    ) {
      parsedValue = parseInt(value) || 0; // Chuyển thành số nguyên
    } else {
      parsedValue = value; // Giữ nguyên chuỗi cho name, description
    }

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // Hàm riêng để cập nhật productSizes
  const updateProductSizes = (newProductSizes: ProductSize[]) => {
    setFormData((prev) => ({ ...prev, productSizes: newProductSizes }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.price <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Price must be greater than 0",
      });
      return;
    }
    if (images.length <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Please select at least 1 photo ",
      });
      return;
    }
    console.log("Submitted data:", formData, images[coverIndex]);

    try {
      const response = await productApi.createProduct(formData, images); // ✅ await ở đây
      Swal.fire({
        title: "🎉 Đăng bài thành công!",
        text: "Bài viết của bạn đã được đăng.",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log("Response from API:", response);
      router.push("/");
    } catch (error) {
      console.error(" Error while creating product:", error);
    }
  };

  return (
    <div className="flex-col mx-auto py-6 bg-white">
      <h1 className="text-center text-gray-800 mb-6">
        <span className="text-2xl font-bold">Post Product</span>
        <p className="w-full border border-gray-200 mt-4"></p>
      </h1>
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="w-1/2">
          <UploadImages
            images={images}
            setImages={setImages}
            coverIndex={coverIndex}
            setCoverIndex={setCoverIndex}
          />
        </div>
        <ProductForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          updateProductSizes={updateProductSizes} // Truyền hàm mới
        />
      </div>
    </div>
  );
}
