import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaNewspaper,
  FaPoll,
  FaInbox,
  FaFlag,
  FaGift,
  FaMapMarkedAlt,
  FaBuilding,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
  { href: "/admin/dashboard/news", label: "News", icon: FaNewspaper },
  { href: "/admin/dashboard/polls", label: "Polls", icon: FaPoll },
  { href: "/admin/dashboard/submissions", label: "Submissions", icon: FaInbox },
  { href: "/admin/dashboard/reports", label: "Reports", icon: FaFlag },
  { href: "/admin/dashboard/rewards", label: "Rewards", icon: FaGift },
  {
    href: "/admin/dashboard/villages",
    label: "Villages",
    icon: FaMapMarkedAlt,
  },
  {
    href: "/admin/dashboard/facilities",
    label: "Facilities",
    icon: FaBuilding,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex h-screen sticky top-0 bg-white dark:bg-gray-800 shadow-lg hidden sm:block">
      <div>
        <div className="p-6 border-b shadow-sm h-20">
          <h1 className="text-2xl font-bold text-secondary dark:text-indigo-400">
            Admin Panel
          </h1>
        </div>
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    pathname === item.href
                      ? "bg-indigo-100 dark:bg-indigo-900 text-secondary dark:text-indigo-400 border-l-4 border-secondary dark:border-indigo-400"
                      : ""
                  }`}
                >
                  <item.icon className="text-xl" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Tombol Logout */}
      <div className="w-full border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center gap-3 w-full p-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
