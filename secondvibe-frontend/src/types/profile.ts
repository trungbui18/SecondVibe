export interface ClientProfileResponse {
  id: number;
  fullName: string;
  address: string;
  avatar: string;
  joined: string;
}

export interface ClientDetailResponse {
  id: number;
  fullName: string;
  sdt: string;
  address: string;
  birthday: string;
  avatar: string;
  amount: number;
  joined: string;
  email: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branch: string;
}

export interface UpdateClientRequest {
  fullName: string;
  sdt: string;
  address: string;
  birthday: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branch: string;
}

export interface UpdateClientResponse {
  id: number;
  fullName: string;
  sdt: string;
  address: string;
  birthday: string;
  avatar: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branch: string;
}

export interface TopSellerResponse {
  name: string;
  avt: string;
  orderCount: number;
  sellerId: number;
}

export interface AllClientResponse {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
  status: string;
  create_at: string;
}
