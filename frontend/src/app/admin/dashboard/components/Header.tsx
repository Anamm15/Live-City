import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="h-20 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between sticky top-0 z-10 px-14">
      <div className="relative text-2xl font-bold text-secondary">
        Make This City Becomes a Better Place
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            3
          </span>
        </button>
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl text-gray-400" />
          <div className="hidden md:block">
            <span className="font-medium">Admin</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
