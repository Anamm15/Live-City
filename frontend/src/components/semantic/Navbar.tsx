"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/buttons/Button";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Dummy auth, ganti dengan context/logic auth kamu
  const user = true;

  // Tutup menu kalau path berubah
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Nonaktifkan scroll kalau menu terbuka
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed z-50 backdrop-blur-sm w-full h-20 top-0 left-0 flex justify-center items-center border-b border-gray-300 bg-white/70">
        <div className="flex justify-between items-center w-full max-w-[1280px] px-4">
          {/* Logo */}
          <div className="text-3xl font-bold cursor-pointer text-black z-50">
            <Link href="/">LiveCity</Link>
          </div>

          {/* Desktop Nav */}
          {user && (
            <div className="hidden md:flex items-center gap-10 font-bold text-lg text-black">
              <CustomNavLink href="/">Home</CustomNavLink>
              <CustomNavLink href="/services">Services</CustomNavLink>
              <CustomNavLink href="/news">News</CustomNavLink>
              <CustomNavLink href="/facilities">Facilities</CustomNavLink>
            </div>
          )}

          {/* Auth Button Desktop */}
          <div className="hidden md:flex">
            {user ? (
              <Button className="w-28 py-2 rounded-lg font-semibold">
                Logout
              </Button>
            ) : (
              <div className="flex gap-5">
                <Button className="w-28 py-2 rounded-lg font-semibold">
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="w-28 py-2 rounded-lg font-semibold">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Hamburger for Mobile */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hamburger-button"
            >
              <span
                className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed bottom-0 right-0 h-full w-4/5 max-w-sm bg-white z-40
          transform transition-transform pt-20 duration-500 ease-in-out md:hidden
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-5">
          <nav className="flex flex-col flex-grow text-xl font-semibold">
            <ul className="flex flex-col gap-6">
              {user ? (
                <>
                  <li>
                    <CustomNavLink href="/">Home</CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink href="/services">Services</CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink href="/news">News</CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink href="/facilities">Facilities</CustomNavLink>
                  </li>
                </>
              ) : (
                <>
                  <Button className="w-full py-2 text-lg rounded-xl">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="w-full py-2 text-lg rounded-xl mt-2">
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </ul>
          </nav>

          {user && (
            <div className="mt-auto">
              <Button className="w-full py-2 rounded-xl text-lg">Logout</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

const CustomNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`${
        isActive ? "text-blue-600 underline underline-offset-4" : "text-black"
      } transition-colors`}
    >
      {children}
    </Link>
  );
};
