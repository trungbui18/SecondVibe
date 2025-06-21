"use client";

import { useState } from "react";

interface ImageItem {
  idImage: number;
  urlImage: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const prev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const next = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="flex flex-col  w-full">
      {/* Ảnh chính */}
      <div className="w-[400px] h-[500px] bg-black flex items-center justify-center mb-4 relative">
        <img
          src={images[selectedIndex].urlImage}
          alt={`Ảnh ${selectedIndex + 1}`}
          className="object-contain max-h-full max-w-full"
        />
      </div>

      {/* Danh sách ảnh thu nhỏ */}
      <div className="flex gap-2 items-center overflow-x-auto max-w-full">
        <button onClick={prev} className="px-2 py-1 bg-gray-200 rounded">
          ←
        </button>
        {images.map((img, idx) => (
          <div
            key={img.idImage}
            onClick={() => setSelectedIndex(idx)}
            className={`border-2 ${
              idx === selectedIndex ? "border-red-500" : "border-transparent"
            } p-1 cursor-pointer rounded`}
          >
            <img
              src={img.urlImage}
              alt={`thumb-${idx}`}
              className="w-20 h-20 object-cover"
            />
          </div>
        ))}
        <button onClick={next} className="px-2 py-1 bg-gray-200 rounded">
          →
        </button>
      </div>
    </div>
  );
}
