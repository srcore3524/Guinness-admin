"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

export default function MainLayout({ children }) {
  const pathname = usePathname();

  if (AUTH_ROUTES.includes(pathname)) {
    return children;
  }

  return (
    <div className="flex h-screen bg-[#efefef]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex flex-1 flex-col overflow-auto m-2 p-5 bg-white rounded-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
