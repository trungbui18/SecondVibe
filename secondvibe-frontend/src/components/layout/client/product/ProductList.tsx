import React from "react";

interface Product {
  id: number;
  sellerName: string;
  imageSeller: string;
  name: string;
  price: number;
  condition: string;
  images?: { urlImage: string }[];
}

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded flex flex-col mb-2 transition-transform duration-200 ease-in-out hover:shadow-2xl hover:scale-105  p-3"
        >
          <div className="flex mb-2">
            <img
              src={product.imageSeller}
              alt={`avt_` + product.sellerName}
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-semibold">{product.sellerName}</p>
              <p className="text-xs text-gray-500">Seller</p>
            </div>
          </div>

          <div className="flex justify-center mt-2">
            {product.images?.[0]?.urlImage ? (
              <img
                src={product.images[0].urlImage}
                alt={product.name}
                className="w-60 h-80 object-cover rounded "
              />
            ) : (
              <div className="w-50 h-80 bg-gray-200 flex items-center justify-center rounded">
                <span className="text-gray-500 text-sm">Không có ảnh</span>
              </div>
            )}
          </div>
          <h2 className=" ">{product.name}</h2>
          <p className="font-semibold">{product.price.toLocaleString()} VNĐ</p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.condition}
          </p>
        </div>
      ))}
    </div>
  );
}
