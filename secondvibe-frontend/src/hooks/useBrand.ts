import useSWR from "swr";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { Brand } from "@/types/brand";
import { ApiResponse } from "@/types/apiResponse";

const fetchBrands = async (): Promise<Brand[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<Brand[]>>(
    "/brand/get_all"
  );
  return res.data.data;
};

export const useBrands = () => {
  const { data, error, isLoading } = useSWR("/brand/get_all", fetchBrands);

  return {
    brands: data,
    errorBrand: error,
    isLoadingBrand: isLoading,
  };
};
