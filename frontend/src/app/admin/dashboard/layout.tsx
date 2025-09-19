"use client";

import React from "react";
// import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  // Anda bisa menambahkan logika otentikasi di sini,
  // misalnya mengecek token atau status login
  // const router = useRouter();
  // if (!isAuthenticated) {
  //   router.push('/login');
  //   return null;
  // }

  return (
    <div className="flex min-h-screen relative bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
