import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePrivate, axiosInstancePublic } from "@/lib/axiosInstance";
import {
  RatingRequest,
  RatingResponse,
  // RatingReceivedResponse,
} from "@/types/rating";

const createRating = async (
  data: RatingRequest
): Promise<ApiResponse<string>> => {
  const response = await axiosInstancePrivate.post(
    "/rating/client/create",
    data
  );
  return response.data;
};

const getRatingsByOrder = async (
  orderId: number
): Promise<ApiResponse<RatingResponse[]>> => {
  const response = await axiosInstancePrivate.get(`/rating/order/${orderId}`);
  return response.data;
};

// export const getRatingsReceived = async (
//   userId: number
// ): Promise<RatingReceivedResponse> => {
//   const response = await axiosInstancePublic.get(
//     `/rating/public/get_ratings_received/${userId}`
//   );
//   return response.data;
// };

const ratingApi = {
  createRating,
  getRatingsByOrder,
  // getRatingsReceived,
};

export default ratingApi;
