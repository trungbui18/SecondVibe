export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginGoogleRequest {
  idToken: string;
  sdt: string;
  address: string;
  birthday: string;
}
export interface LoginResponseData {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
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
