"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useProductAdmin } from "@/hooks/useProduct";
import { AllProductAdminResponse } from "@/types/product";
import { useRouter } from "next/navigation";
export default function PageAdminProduct() {
  const { products, error, isLoading } = useProductAdmin();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("PENDING_APPROVAL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredProducts = (products ?? [])
    .filter((product: AllProductAdminResponse) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product: AllProductAdminResponse) =>
      statusFilter === "all" ? true : product.status === statusFilter
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      else return b.price - a.price;
    });

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm theo tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Filter by status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="all">ALL</option>
          <option value="APPROVED">APPROVED</option>
          <option value="PENDING_APPROVAL">PENDING_APPROVAL</option>
          <option value="REJECTED">REJECTED</option>
          <option value="SOLD">SOLD</option>
        </select>

        {/* Sort by price */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>

      {/* Table */}
      {filteredProducts.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ngày tạo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50"
                  onClick={() => router.push(`/admin/products/${product.id}`)}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    #{product.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full
                        ${
                          product.status === "PENDING_APPROVAL"
                            ? "bg-yellow-100 text-yellow-700"
                            : ""
                        }
                        ${
                          product.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                        ${
                          product.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : ""
                        }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {product.category} / {product.subCategory}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(product.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Empty state
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy sản phẩm nào
          </h3>
          <p className="text-gray-500">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </p>
        </div>
      )}
    </div>
  );
}
