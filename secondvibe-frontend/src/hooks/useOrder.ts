"use client";
import useSWR from "swr";
import { axiosInstancePublic, axiosInstancePrivate } from "@/lib/axiosInstance";
import { OrdersSellerResponse, OrderBuyerResponse } from "@/types/order";
import { ApiResponse } from "@/types/apiResponse";

const fetchOrdersSellerResponse = async (): Promise<OrdersSellerResponse[]> => {
  const res = await axiosInstancePrivate.get<
    ApiResponse<OrdersSellerResponse[]>
  >("/order/client/get_all_orders_seller");
  return res.data.data;
};

export const useOrdersSellerResponse = () => {
  const { data, error, isLoading } = useSWR(
    "/order/client/get_all_orders_seller",
    fetchOrdersSellerResponse
  );

  return {
    data,
    error,
    isLoading,
  };
};

const fetchOrdersBuyerResponse = async (): Promise<OrderBuyerResponse[]> => {
  const res = await axiosInstancePrivate.get<ApiResponse<OrderBuyerResponse[]>>(
    "/order/client/get_all_orders_buyer"
  );
  return res.data.data;
};

export const useOrdersBuyerResponse = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/order/client/get_all_orders_buyer",
    fetchOrdersBuyerResponse
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useOrdersSellerResponse;
