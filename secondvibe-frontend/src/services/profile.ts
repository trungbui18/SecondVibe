import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePublic, axiosInstancePrivate } from "@/lib/axiosInstance";
import {
  ClientProfileResponse,
  UpdateClientRequest,
  UpdateClientResponse,
  TopSellerResponse,
  AllClientResponse,
} from "@/types/profile";
export const getProfile = async (
  id: number
): Promise<ApiResponse<ClientProfileResponse>> => {
  const response = await axiosInstancePublic.get(`/client/public/${id}`);
  return response.data;
};
export const getClientCount = async (): Promise<ApiResponse<number>> => {
  const response = await axiosInstancePrivate.get("/client/admin/count");
  return response.data;
};

export const updateClient = async (
  updateClientRequest: UpdateClientRequest
): Promise<ApiResponse<UpdateClientResponse>> => {
  const res = await axiosInstancePrivate.put(
    "/client/client/update",
    updateClientRequest
  );
  return res.data;
};
export const getTopSeller = async (): Promise<
  ApiResponse<TopSellerResponse[]>
> => {
  const res = await axiosInstancePublic.get("/order/public/top_sellers");
  return res.data;
};

export const getAllClient = async (): Promise<
  ApiResponse<AllClientResponse[]>
> => {
  const res = await axiosInstancePrivate.get("/client/admin/get_all_clients");
  return res.data;
};

const profileApi = {
  getProfile,
  getClientCount,
  updateClient,
  getTopSeller,
  getAllClient,
};
export default profileApi;
