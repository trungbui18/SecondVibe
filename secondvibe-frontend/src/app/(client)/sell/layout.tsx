import { ReactNode } from "react";
import Header from "@/components/layout/client/header/Header";
import Footer from "@/components/layout/client/footer/Footer";

export default function SellLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-16">
        <Header />
      </div>
      <main className="flex-1 px-16">{children}</main>
      <Footer />
    </div>
  );
}
