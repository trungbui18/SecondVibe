import { ApiResponse } from "@/types/apiResponse";
import { axiosInstancePublic, axiosInstancePrivate } from "@/lib/axiosInstance";
import {
  ProductCreateRequest,
  Product,
  ModerationProductRequest,
  ProductUpdateRequest,
  ProductViewResponse,
  FilterProductRequest,
  SizeQuantityRequest,
  CheckQuantity,
  CheckQuantityProductRequest,
} from "@/types/product";
const createProduct = async (
  data: ProductCreateRequest,
  images: File[]
): Promise<ApiResponse<Product>> => {
  const formData = new FormData();
  const product = {
    name: data.name,
    description: data.description,
    price: data.price,
    seller: data.seller,
    condition: data.condition,
    brand: data.brand,
    subCategory: data.subCategory,
    productSizes: data.productSizes,
  };

  // Append product sizes
  formData.append("product", JSON.stringify(product));
  images.forEach((image) => {
    formData.append("images", image);
  });
  try {
    const response = await axiosInstancePrivate.post<ApiResponse<Product>>(
      "/product/public/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

const getProductById = async (id: number): Promise<ApiResponse<Product>> => {
  const response = await axiosInstancePublic.get(
    `/product/public/get_by_idproduct/${id}`
  );
  return response.data;
};

const getCountProduct = async (): Promise<ApiResponse<number>> => {
  const res = await axiosInstancePrivate.get("/product/admin/count");
  return res.data;
};

const moderationProduct = async (
  data: ModerationProductRequest
): Promise<ApiResponse<string>> => {
  const res = await axiosInstancePrivate.put(
    "/product/admin/moderation_product",
    data
  );
  return res.data;
};

const updateProduct = async (
  id: number,
  formData: FormData
): Promise<ApiResponse<Product>> => {
  const res = await axiosInstancePublic.put(
    `/product/public/update/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

const searchKeyProduct = async (
  key: string
): Promise<ApiResponse<string[]>> => {
  const res = await axiosInstancePublic.get(
    `/product/public/search_key/${key}`
  );
  return res.data;
};

const searchProduct = async (
  key: string
): Promise<ApiResponse<ProductViewResponse[]>> => {
  const res = await axiosInstancePublic.get(`/product/public/search/${key}`);
  return res.data;
};

const filterProduct = async (
  data: FilterProductRequest
): Promise<ApiResponse<ProductViewResponse[]>> => {
  const res = await axiosInstancePublic.post("/product/public/filter", data);
  return res.data;
};

const fetchTopProducts = async (): Promise<
  ApiResponse<ProductViewResponse[]>
> => {
  const res = await axiosInstancePublic("/order/public/top-ordered");
  return res.data;
};

const deleteProduct = async (id: number): Promise<ApiResponse<any>> => {
  const res = await axiosInstancePrivate.put(`/product/client/delete/${id}`);
  return res.data;
};

const checkQuantityProduct = async (
  data: CheckQuantityProductRequest
): Promise<ApiResponse<CheckQuantity>> => {
  const res = await axiosInstancePrivate.post(
    "/product/public/check_quantity",
    data
  );
  return res.data;
};

const productApi = {
  createProduct,
  getProductById,
  getCountProduct,
  moderationProduct,
  updateProduct,
  searchKeyProduct,
  searchProduct,
  filterProduct,
  fetchTopProducts,
  deleteProduct,
  checkQuantityProduct,
};
export default productApi;
