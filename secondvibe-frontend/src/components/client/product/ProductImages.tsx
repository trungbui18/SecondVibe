"use client";

import { useState } from "react";

export default function ProductImages({ images }: { images: any[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-gray-500 text-center">
        Không có hình ảnh sản phẩm
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={
              images[selectedImage]?.urlImage ||
              "/placeholder.svg?height=400&width=400"
            }
            alt={`Hình ${selectedImage + 1}`}
            className="object-cover"
          />
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image: any, index: number) => (
          <button
            key={image.idImage}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
              selectedImage === index
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={image.urlImage || "/placeholder.svg?height=80&width=80"}
              alt={`Hình ${index + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
