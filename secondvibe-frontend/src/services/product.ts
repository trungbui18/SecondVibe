import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { ProductCreateRequest, Product } from "@/types/product";
import Router from "next/router";
export const createProduct = async (
  data: ProductCreateRequest,
  images: File[]
): Promise<ApiResponse<Product>> => {
  const formData = new FormData();
  const product = {
    name: data.name,
    description: data.description,
    price: data.price,
    seller: 4,
    condition: data.condition,
    brand: data.brand,
    subCategory: data.subCategory,
    productSizes: data.productSizes,
  };

  // Append product sizes
  formData.append("product", JSON.stringify(product));
  images.forEach((image) => {
    formData.append("images", image);
  });
  try {
    const response = await axiosInstancePublic.post<ApiResponse<Product>>(
      "/product/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

const productApi = {
  createProduct,
};
export default productApi;
