import useSWR from "swr";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { Product } from "@/types/product";
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
