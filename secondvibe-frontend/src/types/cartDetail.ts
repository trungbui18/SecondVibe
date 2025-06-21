export interface CartDetail {
  id: number;
  quantity: number;
  idProduct: number;
  urlImage: string;
  size: string;
  price: number;
  name: string;
}

export interface SellerInCartResponse {
  id: number;
  name: string;
  urlImage: string;
  cartDetails: CartDetail[];
}

export interface CartDetailUpdateCreate {
  idCartDetail: number;
  quantity: number;
}
