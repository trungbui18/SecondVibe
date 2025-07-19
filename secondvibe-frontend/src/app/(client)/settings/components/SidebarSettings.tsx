"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Profile", href: "/settings/profile" },
  { label: "Change Password", href: "/settings/password" },
  { label: "Rechange ", href: "/settings/recharge" },
  { label: "Withdraw ", href: "/settings/withdraw" },
];
export default function SidebarSettings() {
  const pathname = usePathname();
  return (
    <aside className="w-64  min-h-screen bg-white border-r border-gray-200 py-10 px-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Settings</h2>
      <nav className="flex flex-col space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded transition-colors duration-200 font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 ${
              pathname === item.href ? "bg-red-100 text-red-600" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
