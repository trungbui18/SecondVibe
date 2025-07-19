import { ApiResponse } from "@/types/apiResponse";
import { ClientDetailResponse } from "@/types/profile";
import { axiosInstancePrivate, axiosInstancePublic } from "@/lib/axiosInstance";
import useSWR from "swr";

const fetchClientDetailData = async () => {
  const res = await axiosInstancePrivate<ApiResponse<ClientDetailResponse>>(
    "/client/detail"
  );
  return res.data.data;
};

export const useClientDetail = () => {
  const { data, error, isLoading } = useSWR(
    "/client/detail",
    fetchClientDetailData
  );

  return {
    data,
    error,
    isLoading,
  };
};
