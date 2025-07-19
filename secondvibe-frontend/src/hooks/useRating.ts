import useSWR from "swr";
import { RatingResponse } from "@/types/rating";
import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePublic, axiosInstancePrivate } from "@/lib/axiosInstance";

const fetchReview = async (id: number): Promise<RatingResponse[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<RatingResponse[]>>(
    `/rating/public/get_ratings_received/${id}`
  );
  return res.data.data;
};

export const useRating = (id: number) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    `/rating/public/get_ratings_received/${id}`,
    () => fetchReview(id)
  );

  return {
    ratings: data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};
