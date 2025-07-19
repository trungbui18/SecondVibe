"use client";

import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Package, ShoppingCart, DollarSign } from "lucide-react";
import useOrdersSellerResponse from "@/hooks/useOrder";

const ManagementMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: orders } = useOrdersSellerResponse();

  // Kiểm tra có đơn pending không
  const hasPendingOrder = orders?.some(
    (order) => order.orderStatus === "PENDING"
  );

  const menuItems = [
    {
      label: "Dashboard",
      href: "/manage/dashboard",
      icon: BarChart3,
    },
    {
      label: "Order",
      href: "/manage/order",
      icon: ShoppingCart,
    },
    {
      label: "Product",
      href: "/manage/product",
      icon: Package,
    },
    {
      label: "Rejected",
      href: "/manage/revenue",
      icon: DollarSign,
    },
  ];

  return (
    <div className="w-full bg-white text-sm top-0 left-0 flex h-16 border-b border-gray-200 z-50">
      <nav className="flex space-x-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex items-center px-4 py-2 transition-colors ${
                isActive
                  ? "bg-green-50 text-green-700 border-b-2 border-green-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center">
                <Icon className="w-5 h-5 mr-2" />
                {item.label}
                {item.label === "Order" && hasPendingOrder && (
                  <span className="ml-2 block w-2 h-2 rounded-full bg-red-500"></span>
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ManagementMenu;
