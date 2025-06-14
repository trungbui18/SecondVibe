"use client";

import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="bg-white w-full flex items-center justify-between px-28">
        <Link href="/">
          <img src="/logoLVTN.png" alt="Bon Logo" className="h-20" />
        </Link>
        <p className="text-sm text-gray-600">Bạn cần giúp đỡ?</p>
      </div>
      <div className="flex items-center justify-center bg-red-500 p-8">
        <div className="flex rounded-3xl overflow-hidden shadow-lg bg-white w-3/4 ">
          <main className="w-1/2 p-8">{children}</main>

          <div className="w-1/2">
            <img
              src="/j97.webp"
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
