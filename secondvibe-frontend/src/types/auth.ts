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
