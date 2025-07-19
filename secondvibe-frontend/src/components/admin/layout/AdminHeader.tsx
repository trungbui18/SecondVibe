"use client";

import { useRef, useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const getTitleFromPath = (pathname: string): string => {
  if (pathname.includes("/admin/products")) return "Products";
  if (pathname.includes("/admin/orders")) return "Orders";
  if (pathname.includes("/admin/clients")) return "Clients";
  if (pathname.includes("/admin/report")) return "Reports";
  if (pathname.includes("/admin/settings")) return "Settings";
  return "Dashboard";
};

export default function AdminHeader({
  setSidebarOpen,
}: {
  setSidebarOpen: (value: boolean) => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const pageTitle = getTitleFromPath(pathname);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">{pageTitle}</h2>
        </div>

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AD</span>
            </div>
            <span className="hidden md:block text-gray-700 font-medium">
              Admin
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">My Account</p>
              </div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Settings
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
