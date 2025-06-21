export interface CartCreateRequest {
  idClient: number;
  productId: number;
  sizeId: string;
  quantity: number;
}
export interface CartResponse {
  id: number;
  quantity: number;
}
