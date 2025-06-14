import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";
import AuthInitializer from "@/lib/AuthInitializer";
export const metadata: Metadata = {
  title: "SecondVibe Bon",
  description: "Sàn thương mại quần áo cũ ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <AuthInitializer>{children}</AuthInitializer>
        </Providers>
      </body>
    </html>
  );
}
