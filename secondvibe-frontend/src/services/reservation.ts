import { axiosInstancePublic } from "@/lib/axiosInstance";
import { CreateReservationRequest } from "@/types/reservation";
import { ApiResponse } from "@/types/apiResponse";

const CheckOut = async (
  data: CreateReservationRequest
): Promise<ApiResponse<string>> => {
  const res = await axiosInstancePublic.post("/checkout", data);
  return res.data;
};

const reservationApi = {
  CheckOut,
};
export default reservationApi;
