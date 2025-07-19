import useSWR from "swr";
import { axiosInstancePublic, axiosInstancePrivate } from "@/lib/axiosInstance";
import {
  Product,
  AllProductRejected,
  AllProductAdminResponse,
  MyProductResponse,
  ProductViewResponse,
} from "@/types/product";
import { ApiResponse } from "@/types/apiResponse";

const fetchProducts = async (): Promise<ProductViewResponse[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<ProductViewResponse[]>>(
    "/product/public/get_all"
  );
  return res.data.data;
};
export const useProducts = () => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "/public/public/products",
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
): Promise<ProductViewResponse[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<ProductViewResponse[]>>(
    `/product/public/get_all_by_userId/${id}`
  );
  return res.data.data;
};
export const useProductsInProfile = (id: number) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    id ? `/productsInProfile/${id}` : null,
    () => fetchProductsInProfile(id)
  );

  return {
    products: data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};

const fetchAllProductAdmin = async (): Promise<AllProductAdminResponse[]> => {
  const res = await axiosInstancePrivate.get<
    ApiResponse<AllProductAdminResponse[]>
  >("product/admin/get_all");
  return res.data.data;
};

export const useProductAdmin = () => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "product/admin/get_all",
    fetchAllProductAdmin
  );

  return {
    products: data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};

const getProductById = async (id: number): Promise<ApiResponse<Product>> => {
  const response = await axiosInstancePublic.get(
    `/product/public/get_by_idproduct/${id}`
  );
  return response.data;
};
export const useProductDetail = (id: number) => {
  const shouldFetch = !!id;
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    shouldFetch ? `/product/public/get_by_idproduct/${id}` : null,
    () => getProductById(id)
  );

  return {
    productData: data?.data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};

const fetchMyProducts = async (): Promise<MyProductResponse[]> => {
  const res = await axiosInstancePrivate.get<ApiResponse<MyProductResponse[]>>(
    "/product/client/me"
  );
  return res.data.data;
};
export const useMyProducts = () => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "/product/client/me",
    () => fetchMyProducts()
  );

  return {
    products: data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};

const fetchProductsByBrand = async (
  brand: string
): Promise<ProductViewResponse[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<ProductViewResponse[]>>(
    `/product/public/product_by_brand?brand=${encodeURIComponent(brand)}`
  );
  return res.data.data;
};

export const useProductsByBrand = (brand: string | undefined) => {
  const shouldFetch = !!brand;
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    shouldFetch ? `/product/public/product_by_brand?brand=${brand}` : null,
    () => fetchProductsByBrand(brand!)
  );
  return {
    products: data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};

const fetchMyProductsRejected = async (): Promise<AllProductRejected[]> => {
  const res = await axiosInstancePrivate.get<ApiResponse<AllProductRejected[]>>(
    "/product/client/rejected"
  );
  return res.data.data;
};
export const useMyProductsRejected = () => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "/product/client/rejected",
    () => fetchMyProductsRejected()
  );

  return {
    products: data,
    error,
    isLoading,
  };
};
