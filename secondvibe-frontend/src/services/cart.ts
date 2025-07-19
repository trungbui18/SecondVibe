import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePrivate, axiosInstancePublic } from "@/lib/axiosInstance";
import { CartCreateRequest, CartResponse } from "@/types/cart";

export const AddToCart = async (
  cartCreate: CartCreateRequest
): Promise<ApiResponse<CartResponse>> => {
  const response = await axiosInstancePublic.post("/cart/create", cartCreate);
  return response.data;
};

export const getCart = async (): Promise<ApiResponse<CartResponse>> => {
  const response = await axiosInstancePrivate.get("/cart/get_by_idClient");
  return response.data;
};

const cartApi = {
  AddToCart,
  getCart,
};
export default cartApi;
