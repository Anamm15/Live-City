import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiChartBar, HiUsers, HiCog } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  { href: "/services", label: "Dashboard", icon: HiHome },
  { href: "/services/submission", label: "Submission", icon: HiChartBar },
  { href: "/services/report", label: "Report", icon: HiUsers },
  { href: "/services/history", label: "History", icon: HiCog },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 xl:w-80 2xl:w-96 px-2 md:px-10 transform bg-background text-black transition-transform shadow-xl duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col">
        {/* Header Sidebar */}
        <div className="flex h-16 items-center justify-between px-4 mt-5">
          <Link href="/" className="text-3xl font-bold text-black">
            LiveCity
          </Link>
          {/* Tombol Close untuk Mobile */}
          <button onClick={onClose} className="text-black lg:hidden">
            <IoClose size={28} />
          </button>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 space-y-2 px-2 py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center rounded-md px-4 py-2.5 text-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-gray-700/80 text-white"
                    : "text-black hover:bg-gray-300 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-8 w-8" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4">
          <div className="rounded-lg bg-accent p-4 text-center font-semibold">
            <p className="text-sm">User Name</p>
            <p className="text-xs">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
