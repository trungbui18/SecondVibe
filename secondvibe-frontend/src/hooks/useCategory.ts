import useSWR from "swr";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { category } from "@/types/category";
import { ApiResponse } from "@/types/apiResponse";

const fetchCategories = async (): Promise<category[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<category[]>>(
    "/category/get_all"
  );
  return res.data.data;
};
export const useCategories = () => {
  const { data, error, isLoading } = useSWR(
    "/category/get_all",
    fetchCategories
  );

  return {
    categories: data,
    errorCategory: error,
    isLoadingCategory: isLoading,
  };
};
