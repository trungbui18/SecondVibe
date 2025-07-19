"use client";
import React, { useRef } from "react";
import { Upload, X } from "lucide-react";

export interface ProductImage {
  idImage: number;
  urlImage: string;
}

interface ProductImagesProps {
  images: ProductImage[];
  deletedImageIds: number[];
  onToggleImage: (idImage: number) => void;
  onAddImages: (files: File[]) => void;
}

export default function ProductImages({
  images,
  deletedImageIds,
  onToggleImage,
  onAddImages,
}: ProductImagesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    onAddImages(files); // gửi files thật lên cha
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Product Images</h2>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Images
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => {
          const isDeleted = deletedImageIds.includes(image.idImage);
          return (
            <div
              key={image.idImage}
              className={`relative group ${
                isDeleted ? "opacity-40 grayscale" : ""
              }`}
            >
              <img
                src={image.urlImage || "/placeholder.svg"}
                alt="product"
                className="w-full h-32 object-contain rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => onToggleImage(image.idImage)}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
