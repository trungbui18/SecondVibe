"use client";

import { ReactNode } from "react";
import Header from "@/components/client/layout/header/Header";
import Footer from "@/components/client/layout/footer/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-16">
        <Header />
      </div>
      <main className="flex-1 px-16 mt-20">{children}</main>
      <Footer />
    </div>
  );
}
