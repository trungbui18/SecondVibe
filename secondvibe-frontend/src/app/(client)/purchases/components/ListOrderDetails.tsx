// ListOrderDetails.tsx
"use client";
import React from "react";
import {
  ShoppingBag,
  User,
  Package,
  Calendar,
  Receipt,
  Star,
  MapPin,
} from "lucide-react";
interface Item {
  id: string;
  name: string;
  urlImage?: string;
  size: string;
  quantity: number;
  price: number;
}

interface Props {
  items: Item[];
  formatPrice: (value: number) => string;
}

export default function ListOrderDetails({ items, formatPrice }: Props) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id}>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={item.urlImage || "/placeholder.svg?height=80&width=80"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-base mb-3 line-clamp-2">
                {item.name}
              </h4>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Size: {item.size}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  SL: {item.quantity}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {formatPrice(item.price)} × {item.quantity}
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {index < items.length - 1 && (
            <div className="mt-6 border-t border-gray-100"></div>
          )}
        </div>
      ))}
    </div>
  );
}
