import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { ClientProfileResponse } from "@/types/profile";
export const getProfile = async (
  id: number
): Promise<ApiResponse<ClientProfileResponse>> => {
  const response = await axiosInstancePublic.get(`/client/${id}`);
  return response.data;
};

const profileApi = {
  getProfile,
};
export default profileApi;
