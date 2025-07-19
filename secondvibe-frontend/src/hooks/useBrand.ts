import useSWR from "swr";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { Brand } from "@/types/brand";
import { ApiResponse } from "@/types/apiResponse";

const fetchBrands = async (): Promise<Brand[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<Brand[]>>(
    "/brand/public/get_all"
  );
  return res.data.data;
};

export const useBrands = () => {
  const { data, error, isLoading } = useSWR(
    "/brand/public/get_all",
    fetchBrands
  );

  return {
    brands: data,
    errorBrand: error,
    isLoadingBrand: isLoading,
  };
};
