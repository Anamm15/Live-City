"use client";

import { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import { HiMenuAlt1 } from "react-icons/hi";

type ServiceLayoutProps = {
  children: ReactNode;
};

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-hidden="true"
        ></div>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-sm sm:px-6 lg:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-900 hover:text-gray-700 lg:hidden"
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Buka sidebar</span>
            <HiMenuAlt1 size={32} />
          </button>

          <div className="flex items-center">
            <p>Welcome, Surabaya!</p>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
