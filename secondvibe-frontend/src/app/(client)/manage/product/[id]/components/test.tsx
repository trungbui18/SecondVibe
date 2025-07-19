"use client";

import type React from "react";

import { useState } from "react";
import { Trash2, Plus, Upload, X } from "lucide-react";

// Types based on your Java classes
interface ProductImageResponse {
  idImage: number;
  urlImage: string;
}

interface ProductSizeRequest {
  sizeId: string;
  quantity: number;
}

enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  DISCONTINUED = "DISCONTINUED",
}

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  status: ProductStatus;
  price: number;
  seller: number;
  sellerName: string;
  imageSeller: string;
  condition: string;
  brand: string;
  subCategory: string;
  productSizes: ProductSizeRequest[];
  images: ProductImageResponse[];
}

export default function ProductUpdateForm() {
  const [product, setProduct] = useState<ProductResponse>({
    id: 1,
    name: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and premium sound quality.",
    status: ProductStatus.ACTIVE,
    price: 299.99,
    seller: 1,
    sellerName: "TechStore Official",
    imageSeller: "/placeholder.svg?height=40&width=40",
    condition: "New",
    brand: "AudioTech",
    subCategory: "Electronics > Audio > Headphones",
    productSizes: [
      { sizeId: "S", quantity: 10 },
      { sizeId: "M", quantity: 25 },
      { sizeId: "L", quantity: 15 },
    ],
    images: [
      { idImage: 1, urlImage: "/placeholder.svg?height=200&width=200" },
      { idImage: 2, urlImage: "/placeholder.svg?height=200&width=200" },
      { idImage: 3, urlImage: "/placeholder.svg?height=200&width=200" },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ProductResponse, value: any) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSizeChange = (
    index: number,
    field: keyof ProductSizeRequest,
    value: any
  ) => {
    const updatedSizes = [...product.productSizes];
    updatedSizes[index] = { ...updatedSizes[index], [field]: value };
    setProduct((prev) => ({ ...prev, productSizes: updatedSizes }));
  };

  const addSize = () => {
    setProduct((prev) => ({
      ...prev,
      productSizes: [...prev.productSizes, { sizeId: "", quantity: 0 }],
    }));
  };

  const removeSize = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      productSizes: prev.productSizes.filter((_, i) => i !== index),
    }));
  };

  const removeImage = (idImage: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.idImage !== idImage),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Updated product:", product);
    setIsLoading(false);
    alert("Product updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Update Product</h1>
          <p className="mt-2 text-gray-600">
            Modify product information and inventory details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={product.price}
                    onChange={(e) =>
                      handleInputChange(
                        "price",
                        Number.parseFloat(e.target.value)
                      )
                    }
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={product.status}
                  onChange={(e) =>
                    handleInputChange("status", e.target.value as ProductStatus)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={ProductStatus.ACTIVE}>Active</option>
                  <option value={ProductStatus.INACTIVE}>Inactive</option>
                  <option value={ProductStatus.OUT_OF_STOCK}>
                    Out of Stock
                  </option>
                  <option value={ProductStatus.DISCONTINUED}>
                    Discontinued
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select
                  value={product.condition}
                  onChange={(e) =>
                    handleInputChange("condition", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  value={product.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={product.subCategory}
                  onChange={(e) =>
                    handleInputChange("subCategory", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Electronics > Audio > Headphones"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={product.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description..."
              />
            </div>
          </div>

          {/* Seller Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Seller Information
            </h2>

            <div className="flex items-center space-x-4">
              <img
                src={product.imageSeller || "/placeholder.svg"}
                alt="Seller"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seller Name
                </label>
                <input
                  type="text"
                  value={product.sellerName}
                  onChange={(e) =>
                    handleInputChange("sellerName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Product Images
              </h2>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.images.map((image) => (
                <div key={image.idImage} className="relative group">
                  <img
                    src={image.urlImage || "/placeholder.svg"}
                    alt={`Product ${image.idImage}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.idImage)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes & Inventory */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Sizes & Inventory
              </h2>
              <button
                type="button"
                onClick={addSize}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Size
              </button>
            </div>

            <div className="space-y-4">
              {product.productSizes.map((size, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <input
                      type="text"
                      value={size.sizeId}
                      onChange={(e) =>
                        handleSizeChange(index, "sizeId", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., S, M, L, XL"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={size.quantity}
                      onChange={(e) =>
                        handleSizeChange(
                          index,
                          "quantity",
                          Number.parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Updating...
                </div>
              ) : (
                "Update Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
