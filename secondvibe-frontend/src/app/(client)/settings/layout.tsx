import React from "react";
import SidebarSettings from "./components/SidebarSettings";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarSettings />
      <main className="flex-1 px-24">{children}</main>
    </div>
  );
}
