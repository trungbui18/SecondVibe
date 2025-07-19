export interface RatingRequest {
  ratedUserId: number;
  productId: number;
  orderDetailId: number;
  score: number;
  comment: string;
}

export interface RatingResponse {
  id: number;
  raterId: number;
  raterName: string;
  raterAvatar: string;
  ratedUserId: number;
  ratedUserName: string;
  ratedUserAvatar: string;
  productId: number;
  productName: string;
  productFirstImage: string;
  score: number;
  comment: string;
  createdAt: string;
}
