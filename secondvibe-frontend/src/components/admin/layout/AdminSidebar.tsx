"use client";

import {
  X,
  Home,
  Users,
  Package,
  ShoppingCart,
  LogOut,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/slice/authSlice";
import authApi from "@/services/auth";

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/clients" },
  { icon: Package, label: "Products", path: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
  { icon: LogOut, label: "Logout", path: "/logout" }, // thay thế Reports bằng Logout
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (path: string) => {
    // nếu là logout thì xử lý riêng
    if (path === "/logout") {
      authApi.logout();
      dispatch(logout());
      window.location.href = "/login";
      return;
    }

    router.push(path);
    setSidebarOpen(false); // Đóng sidebar trên mobile sau khi click
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        <button
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <nav className="mt-6">
        {sidebarItems.map((item, index) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={index}
              onClick={() => handleClick(item.path)}
              className={`w-full text-left flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-medium"
                  : ""
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
