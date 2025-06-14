// components/UploadImages.tsx
"use client";
import React from "react";

interface UploadImagesProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  coverIndex: number;
  setCoverIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function UploadImages({
  images,
  setImages,
  coverIndex,
  setCoverIndex,
}: UploadImagesProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files);
    if (images.length + newImages.length > 10) {
      alert("Chỉ được tối đa 10 ảnh.");
      return;
    }
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    if (index === coverIndex) setCoverIndex(0);
  };

  return (
    <div className="max-w-xl mx-auto p-4 rounded-xl shadow-xl ">
      {/* Upload box */}
      <label className=" bg-green-100 block border-2 border-dashed border-green-600 p-6 text-center rounded cursor-pointer hover:bg-green-50">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <div className="text-green-600 font-medium text-lg mb-1">
          Select photos
        </div>
        <div className="text-sm text-gray-500">or drag photos here</div>
        <div className="text-xs mt-1">(Up to 10 photos)</div>
      </label>

      {/* List preview */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative group">
            <img
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              className="w-full h-32 object-contain rounded"
              onClick={() => setCoverIndex(idx)}
            />
            {idx === coverIndex && (
              <div className="absolute top-0 left-0 bg-white text-xs text-center font-semibold px-2 py-1 rounded-br">
                COVER
              </div>
            )}
            <button
              onClick={() => handleDelete(idx)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
