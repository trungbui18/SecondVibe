export interface reservationItems {
  productId: number;
  quantity: number;
  sizeId: string;
  price: number;
}

export interface CreateReservationRequest {
  userId: number;
  shippingAddress: string;
  totalAmount: number;
  dealMethod: string;
  paymentMethod: string;
  reservationItems: reservationItems[];
}
