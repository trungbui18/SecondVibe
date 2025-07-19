export interface ProductSize {
  sizeId: string;
  quantity: number;
}

export interface ProductImage {
  idImage: number;
  urlImage: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  price: number;
  seller: number;
  sellerName: string;
  imageSeller: string;
  condition: string;
  brand: string;
  subCategory: string;
  category: string;
  sdt: string;
  productSizes: ProductSize[];
  images: ProductImage[];
}

export interface SizeQuantityRequest {
  size: string;
  quantity: number;
  description: string;
}
export interface ProductCreateRequest {
  name: string;
  description: string;
  price: number;
  seller: number;
  condition: number;
  brand: number;
  subCategory: number;
  productSizes: ProductSize[];
  sizeQuantities: SizeQuantityRequest[];
}

export interface ProductInProfile {
  id: number;
  name: string;
  price: number;
  condition: string;
  img: string;
}

export interface AllProductAdminResponse {
  id: number;
  name: string;
  status: string;
  price: number;
  subCategory: string;
  category: string;
  createdAt: string;
}

export interface ModerationProductRequest {
  idProduct: number;
  status: string;
  reason?: string;
}

export interface MyProductResponse {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
  createdAt: string;
}

export interface ProductUpdateRequest {
  name: string;
  description: string;
  status: string;
  price: number;
  condition: number;
  brand: number;
  subCategory: number;
  productSizes: ProductSize[];
}

export interface ProductViewResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  status: string;
  seller: number;
  sellerName: string;
  imageSeller: string;
  condition: string;
  brand: string;
  subCategory: string;
  category: string;
  img: string;
}

export interface FilterProductRequest {
  categoryName: string;
  subCategoryId: number;
  brandId: number;
  conditionId: number;
  priceFrom: number;
  priceTo: number;
  keyword: string;
  sizeId?: string;
}

export interface AllProductRejected {
  id: number;
  name: string;
  rejectionReason: string;
  price: number;
  status: string;
  images: ProductImage[];
}

export interface CheckQuantity {
  enough: boolean;
  message: string;
  stock: number;
}

export interface CheckQuantityProductRequest {
  idProduct: number;
  quantity: number;
  sizeId: string;
}
