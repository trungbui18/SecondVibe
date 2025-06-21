import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { SellerInCartResponse } from "@/types/cartDetail";
import { CartDetailUpdateCreate } from "@/types/cartDetail";
export const getAllCartDetail = async (
  id: number
): Promise<ApiResponse<SellerInCartResponse[]>> => {
  const res = await axiosInstancePublic.get(
    `/cart_detail/get_all_by_idclient/${id}`
  );
  console.log("data: ", res.data);
  return res.data;
};

export const deleteListCartDetail = async (
  ids: number[]
): Promise<ApiResponse<string>> => {
  const res = await axiosInstancePublic.delete("/cart_detail/delete_all", {
    data: ids,
  });
  return res.data;
};

export const deleteCartDetail = async (
  id: number
): Promise<ApiResponse<string>> => {
  const res = await axiosInstancePublic.delete(`/cart_detail/delete/${id}`);
  return res.data;
};

export const updateCartDetail = async (
  data: CartDetailUpdateCreate
): Promise<ApiResponse<string>> => {
  const res = await axiosInstancePublic.put(
    "/cart_detail/update_cartdetail",
    data
  );
  return res.data;
};

const cartDetailApi = {
  getAllCartDetail,
  deleteListCartDetail,
  deleteCartDetail,
  updateCartDetail,
};
export default cartDetailApi;
