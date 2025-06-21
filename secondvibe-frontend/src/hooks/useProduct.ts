import useSWR from "swr";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { Product, ProductInProfile } from "@/types/product";
import { ApiResponse } from "@/types/apiResponse";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<Product[]>>(
    "/product/get_all"
  );
  return res.data.data;
};
export const useProducts = () => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "/products",
    fetchProducts
  );

  return {
    products: data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};
const fetchProductsInProfile = async (
  id: Number
): Promise<ProductInProfile[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<ProductInProfile[]>>(
    `/product/get_all_by_userId/${id}`
  );
  return res.data.data;
};
export const useProductsInProfile = (id: number) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    id ? `/productsInProfile/${id}` : null, // key động
    () => fetchProductsInProfile(id) // fetcher là 1 arrow function
  );

  return {
    products: data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};
