// src/services/subCategory.ts
import { axiosInstancePublic } from "@/lib/axiosInstance";
import { ApiResponse } from "@/types/apiResponse";
import { SubCategory } from "@/types/subCategory";

const subCategoryApi = {
  getByCategoryName: (categoryName: string) => {
    return axiosInstancePublic.get<ApiResponse<SubCategory[]>>(
      `/subcategory/public/get_all_by_category/${categoryName}`
    );
  },
};

export default subCategoryApi;
