import useSWR from "swr";
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { ApiResponse } from "@/types/apiResponse";
import { SubCategory } from "@/types/subCategory";

const fetchSubCategories = async (
  categoryName: string
): Promise<SubCategory[]> => {
  const res = await axiosInstancePublic.get<ApiResponse<SubCategory[]>>(
    `/subcategory/public/get_all_by_category/${categoryName}`
  );
  return res.data.data;
};
export const useSubCategories = (categoryName: string) => {
  const { data, error, isLoading } = useSWR(
    `/subcategory/public/get_all_by_category/${categoryName}`,
    fetchSubCategories
  );

  return {
    subCategories: data,
    errorSubCategory: error,
    isLoadingSubCategory: isLoading,
  };
};
