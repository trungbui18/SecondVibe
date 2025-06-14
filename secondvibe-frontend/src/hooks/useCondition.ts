import useSWR from "swr";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { Condition } from "@/types/condition";
import { ApiResponse } from "@/types/apiResponse";

const fetchConditions = async (): Promise<Condition[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<Condition[]>>(
    "/condition/get_all"
  );
  return res.data.data;
};
export const useConditions = () => {
  const { data, error, isLoading } = useSWR(
    "/condition/get_all",
    fetchConditions
  );

  return {
    conditions: data,
    errorCondition: error,
    isLoadingCondition: isLoading,
  };
};
