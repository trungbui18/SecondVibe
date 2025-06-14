import { axiosInstancePublic } from "@/lib/axiosInstance";
import { LoginRequest, LoginGoogleRequest } from "@/types/auth";
import { ApiResponse } from "@/types/apiResponse";

interface LoginResponseData {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  sdt: string;
  address: string;
  birthday: string;
}

export const register = async (
  data: RegisterRequest
): Promise<ApiResponse<LoginResponseData>> => {
  try {
    const response = await axiosInstancePublic.post<
      ApiResponse<LoginResponseData>
    >("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Registration failed: ", error);
    throw error;
  }
};

export const login = async (
  data: LoginRequest
): Promise<ApiResponse<LoginResponseData>> => {
  try {
    const response = await axiosInstancePublic.post<
      ApiResponse<LoginResponseData>
    >("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed: ", error);
    throw error;
  }
};

export const loginWithGoogle = async (
  data: LoginGoogleRequest
): Promise<ApiResponse<LoginResponseData>> => {
  const response = await axiosInstancePublic.post<
    ApiResponse<LoginResponseData>
  >("/auth/google", data);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstancePublic.post("/auth/logout");
  return response.data;
};

const authApi = {
  login,
  loginWithGoogle,
  register,
  logout,
};
export default authApi;
