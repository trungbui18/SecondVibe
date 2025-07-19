"use client";
import React, { useState } from "react";
import useSizes from "@/hooks/useSize";
import { useBrands } from "@/hooks/useBrand";
import { useConditions } from "@/hooks/useCondition";
import { useCategories } from "@/hooks/useCategory";

interface ProductSize {
  sizeId: string;
  quantity: number;
}

interface FormData {
  name: string;
  description: string;
  price: number;
  seller: number;
  condition: number;
  brand: number;
  subCategory: number;
  productSizes: ProductSize[];
}

interface ProductFormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  updateProductSizes: (newProductSizes: ProductSize[]) => void; // Thêm prop mới
}

export default function ProductForm({
  formData,
  handleChange,
  handleSubmit,
  updateProductSizes,
}: ProductFormProps) {
  const { brands, isLoadingBrand, errorBrand } = useBrands();
  const { conditions, isLoadingCondition, errorCondition } = useConditions();
  const { categories, isLoadingCategory, errorCategory } = useCategories();
  const { sizes, isLoadingSize, errorSize } = useSizes();
  const [productSizes, setProductSizes] = useState<ProductSize[]>(
    formData.productSizes
  );

  // Cập nhật productSizes và gọi updateProductSizes
  const handleSizeQuantityChange = (sizeId: string, quantity: number) => {
    const updatedSizes = productSizes.some((item) => item.sizeId === sizeId)
      ? productSizes.map((item) =>
          item.sizeId === sizeId ? { ...item, quantity } : item
        )
      : [...productSizes, { sizeId, quantity }];
    setProductSizes(updatedSizes);
    updateProductSizes(updatedSizes); // Gọi hàm mới thay vì handleChange
  };

  // Xóa một kích thước khỏi danh sách
  const handleRemoveSize = (sizeId: string) => {
    const updatedSizes = productSizes.filter((item) => item.sizeId !== sizeId);
    setProductSizes(updatedSizes);
    updateProductSizes(updatedSizes); // Gọi hàm mới
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
    // Reset lại subCategory khi đổi danh mục
    handleChange({
      target: {
        name: "subCategory",
        value: "",
      },
    } as React.ChangeEvent<any>);
  };

  const selectedCategory = categories?.find(
    (cat) => String(cat.id) === selectedCategoryId
  );

  if (isLoadingSize) return <div>Đang tải kích thước...</div>;
  if (errorSize) return <div>Lỗi khi tải kích thước: {errorSize.message}</div>;

  return (
    <div className="w-full md:w-1/2 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <select
            name="brand"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.brand}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose Brand --</option>
            {isLoadingBrand ? (
              <option disabled>Loading....</option>
            ) : errorBrand ? (
              <option disabled>Eror Brand</option>
            ) : (
              brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Condition</label>
          {isLoadingCondition ? (
            <p>Đang tải...</p>
          ) : errorCondition ? (
            <p className="text-red-500">Error Condition</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {conditions?.map((item) => (
                <label key={item.id} className="relative">
                  <input
                    type="radio"
                    name="condition"
                    value={item.id}
                    checked={String(formData.condition) === String(item.id)}
                    onChange={handleChange}
                    className="sr-only peer"
                    required
                  />
                  <div className="px-4 py-2  border border-gray-300 rounded-full cursor-pointer peer-checked:bg-green-100 peer-checked:border-green-500 peer-checked:text-green-700 transition">
                    {item.description}
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            required
          >
            <option value="">-- Choose Category --</option>
            {isLoadingCategory ? (
              <option disabled>Loading....</option>
            ) : errorCategory ? (
              <option disabled>Error Loading</option>
            ) : (
              categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Danh mục phụ */}
        {selectedCategory && (
          <div>
            <label className="block mb-1 font-medium">
              Choose Sub Category
            </label>
            <select
              name="subCategory"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.subCategory}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose Sub Category --</option>
              {selectedCategory.subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Size & Quantity
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sizes?.map((size) => {
              const currentSize = productSizes.find(
                (item) => item.sizeId === size.id.toString()
              );
              const hasQuantity = currentSize && currentSize.quantity > 0;

              return (
                <div
                  key={size.id.toString()}
                  className={`relative p-4 border rounded-lg transition-all duration-200 ${
                    hasQuantity
                      ? "border-blue-300 bg-blue-50 shadow-sm"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-800">{size.id}</span>
                    {hasQuantity && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={currentSize?.quantity ?? ""}
                      onChange={(e) =>
                        handleSizeQuantityChange(
                          size.id.toString(),
                          parseInt(e.target.value) || 0
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-md text-center font-medium transition-colors ${
                        hasQuantity
                          ? "border-blue-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          : "border-gray-300 bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      }`}
                    />

                    {hasQuantity && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(size.id.toString())}
                        className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                        title="Xóa size này"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {hasQuantity && (
                    <div className="mt-2 text-xs text-blue-600 font-medium">
                      Đã chọn: {currentSize?.quantity} sản phẩm
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          POST
        </button>
      </form>
    </div>
  );
}
