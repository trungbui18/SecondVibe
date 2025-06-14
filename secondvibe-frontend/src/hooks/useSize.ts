import useSWR from "swr";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { Size } from "@/types/size";
import { ApiResponse } from "@/types/apiResponse";
const fetchSizes = async (): Promise<Size[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<Size[]>>(
    "/size/get_all"
  );
  return res.data.data;
};
export const useSizes = () => {
  const { data, error, isLoading } = useSWR("/size/get_all", fetchSizes);

  return {
    sizes: data,
    errorSize: error,
    isLoadingSize: isLoading,
  };
};
export default useSizes;
