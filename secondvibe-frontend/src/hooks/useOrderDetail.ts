import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePrivate, axiosInstancePublic } from "@/lib/axiosInstance";
import { OrderSellerResponse } from "@/types/order";
import useSWR from "swr";
const fetchAllOrderDetailsSeller = async (id: string) => {
  const res = await axiosInstancePrivate.get<ApiResponse<OrderSellerResponse>>(
    `/orderdetail/client/get_all_by_orderID/${id}`
  );
  return res.data.data;
};

export const useOrderDetailSeller = (id: string) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    `/orderdetail/client/get_all_by_orderID/${id}`,
    () => fetchAllOrderDetailsSeller(id) // <-- TRUYỀN MỘT HÀM
  );
  return { data, error, isLoading, mutate, isValidating };
};

const orderDetailApi = {
  fetchAllOrderDetailsSeller,
};
export default orderDetailApi;
