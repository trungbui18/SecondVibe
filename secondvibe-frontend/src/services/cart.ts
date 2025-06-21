import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { CartCreateRequest, CartResponse } from "@/types/cart";

export const AddToCart = async (
  cartCreate: CartCreateRequest
): Promise<ApiResponse<CartResponse>> => {
  const response = await axiosInstancePublic.post("/cart/create", cartCreate);
  return response.data;
};

const cartApi = {
  AddToCart,
};
export default cartApi;
