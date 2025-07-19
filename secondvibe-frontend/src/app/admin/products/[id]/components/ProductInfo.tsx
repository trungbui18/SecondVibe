"use client";

import Image from "next/image";

export default function ProductInfo({
  productData,
  status,
}: {
  productData: any;
  status: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {productData.name}
          </h2>
          <p className="text-gray-600">{productData.description}</p>
        </div>

        <div
          className={`
    ml-4 px-2 py-1 rounded text-white
    ${status === "PENDING_APPROVAL" ? "bg-yellow-500" : ""}
    ${status === "APPROVED" ? "bg-green-600" : ""}
    ${status === "REJECTED" ? "bg-red-600" : ""}
  `}
        >
          {status}
        </div>
      </div>

      <div className="text-3xl font-bold text-blue-600 mb-6">
        {productData.price.toLocaleString()}đ
      </div>

      <hr className="border-gray-200 mb-6" />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={productData.imageSeller || "/placeholder.svg"}
            alt={productData.sellerName}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-gray-900">{productData.sellerName}</p>
          <p className="text-sm text-gray-500">Người bán</p>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      <div className="grid grid-cols-2 gap-6">
        <InfoItem label="Tình trạng" value={productData.condition} />
        <InfoItem label="Thương hiệu" value={productData.brand} />
        <InfoItem label="Danh mục" value={productData.subCategory} />
        <div className="flex items-start gap-3">
          <IconWrapper />
          <div>
            <p className="text-sm text-gray-500 mb-1">Kích thước</p>
            <div className="flex gap-2 flex-wrap">
              {productData.productSizes.map((size: any) => (
                <span
                  key={size.sizeId}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
                >
                  {size.sizeId} ({size.quantity})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <IconWrapper />
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function IconWrapper() {
  return (
    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg
        className="w-4 h-4 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4h16v16H4z"
        />
      </svg>
    </div>
  );
}
