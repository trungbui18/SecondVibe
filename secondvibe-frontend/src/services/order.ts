import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePrivate, axiosInstancePublic } from "@/lib/axiosInstance";
import { PaymentRequest } from "@/types/payment";
import {
  OrderResponse,
  CreateOrderRequest,
  UpdateStatusOrderRequest,
  OrderStatusCountResponse,
} from "@/types/order";
import { RevenueAdmin, RevenueSeller } from "@/types/revenue";

export interface SellerStats {
  revenue: string;
  product: number;
  client: number;
  order: number;
}

export interface SellerRecentOrder {
  id: string;
  totalAmount: number;
  createdAt: string;
  orderStatus: string;
}

export const createOrderVNPay = async (
  data: PaymentRequest
): Promise<ApiResponse<Number>> => {
  const response = await axiosInstancePrivate.post(
    "/order/client/pay/create",
    data
  );
  return response.data;
};

export const createOrderCod = async (
  data: CreateOrderRequest
): Promise<ApiResponse<OrderResponse>> => {
  const response = await axiosInstancePrivate.post(
    "/order/client/cod/create",
    data
  );
  return response.data;
};

const getCountOrderAdmin = async (): Promise<ApiResponse<number>> => {
  const res = await axiosInstancePrivate.get("/order/admin/count");
  return res.data;
};

const getRevenueAdmin = async (): Promise<ApiResponse<RevenueAdmin>> => {
  const res = await axiosInstancePrivate.get("/order/admin/revenue");
  return res.data;
};

const updateOrderStatus = async (
  data: UpdateStatusOrderRequest
): Promise<ApiResponse<string>> => {
  const res = await axiosInstancePrivate.put(
    "/order/client/update_status",
    data
  );
  return res.data;
};

const fetchOrderStatusCount = async (): Promise<
  ApiResponse<OrderStatusCountResponse[]>
> => {
  const res = await axiosInstancePrivate("/order/admin/status-counts");
  return res.data;
};

const getSellerStats = async (): Promise<ApiResponse<SellerStats>> => {
  const res = await axiosInstancePrivate.get("/order/client/seller_stats");
  return res.data;
};

const getSellerRecentOrders = async (): Promise<
  ApiResponse<SellerRecentOrder[]>
> => {
  const res = await axiosInstancePrivate.get(
    "/order/client/seller_recent_orders"
  );
  return res.data;
};

const getRevenueSeller = async (): Promise<ApiResponse<RevenueSeller[]>> => {
  const res = await axiosInstancePrivate.get(
    "/order/client/seller_monthly_stats"
  );
  return res.data;
};

const orderApi = {
  createOrderVNPay,
  createOrderCod,
  getCountOrderAdmin,
  getRevenueAdmin,
  updateOrderStatus,
  fetchOrderStatusCount,
  getSellerStats,
  getSellerRecentOrders,
  getRevenueSeller,
};
export default orderApi;
