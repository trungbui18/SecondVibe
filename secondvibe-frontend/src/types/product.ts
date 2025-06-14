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
  productSizes: ProductSize[];
  images: ProductImage[];
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
}
