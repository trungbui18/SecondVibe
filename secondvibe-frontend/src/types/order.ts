export interface OrderResponse {
  id: string;
  shippingAddress: string;
  totalAmount: number;
  dealMethod: string;
  paymentMethod: string;
  fullName: string;
  phone: string;
}

export interface OrderDetailRequest {
  productId: number;
  quantity: number;
  price: number;
  sizeId: string;
}

export interface CreateOrderRequest {
  shippingAddress: string;
  fullName: string;
  phone: string;
  totalAmount: number;
  dealMethod: string;
  paymentMethod: string;
  orderDetails: OrderDetailRequest[];
}

export interface OrdersSellerResponse {
  id: string;
  totalAmount: number;
  createdAt: string;
  orderStatus: string;
}

export interface OrderDetailSellerResponse {
  id: number;
  quantity: number;
  price: number;
  size: string;
  imgUrl: string;
  name: string;
  description: string;
}

export interface OrderSellerResponse {
  id: string;
  shippingAddress: string;
  totalAmount: number;
  dealMethod: string;
  createdAt: string;
  receivedDate: string;
  shippedDate: string;
  orderStatus: string;
  paymentMethod: string;
  fullName: string;
  phone: string;
  orderDetails: OrderDetailSellerResponse[];
}

export interface UpdateStatusOrderRequest {
  id: string;
  orderStatus: string;
}

export interface OrderDetailBuyerResponse {
  id: number;
  quantity: number;
  idProduct: number;
  urlImage: string;
  size: string;
  price: number;
  name: string;
  canRate: boolean;
}

export interface OrderBuyerResponse {
  id: string;
  idSeller: number;
  name_seller: string;
  urlImage_seller: string;
  orderStatus: string;
  details: OrderDetailBuyerResponse[];
}

export interface OrderStatusCountResponse {
  name: string;
  value: string;
}
