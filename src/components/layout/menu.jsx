"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ اضافه شده
import { IoIosHome } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import SearchInput from "../modules/searchInput/SearchInput";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const pathname = usePathname(); // ✅ مسیر فعلی

  const linkClass = (path) =>
    `flex items-center cursor-pointer font-semibold py-2 transition-colors ${
      pathname === path ? "text-yellow-400" : "text-gray-300 hover:text-[#49C5B6]"
    }`;

  return (
    <div className="bg-gray-950/80 backdrop-blur-[4PX] font-sans font-medium text-xs">
      <div className="container flex items-center justify-between">
        <ul className="hidden lg:flex items-center gap-3 md:gap-4 lg:gap-5 py-1">
          <li
            className={`rounded-lg px-2 transition-colors ${
              pathname === "/" ? "bg-yellow-500" : "bg-[#49C5B6] hover:bg-[#31ccba]"
            }`}
          >
            <Link href="/" className="flex items-center text-gray-50 font-semibold py-1">
              <IoIosHome className="text-white size-4" />
              صفحه اصلی
            </Link>
          </li>

          <li>
            <Link href="/special" className={linkClass("/special")}>
              ویژگی های شاخص ما
            </Link>
          </li>

          <li className="relative group">
            <div
              className={`flex items-center cursor-pointer font-semibold py-2 transition-colors ${
                pathname.startsWith("/products")
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-[#49C5B6]"
              }`}
            >
              محصولات <IoMdArrowDropdown className="ml-1 w-4 h-4" />
            </div>

            <ul
              className="absolute right-0 top-full mt-0 w-52 bg-gray-800 text-gray-300 rounded-md shadow-lg
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-opacity duration-300 z-20"
            >
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer whitespace-nowrap transition-colors duration-200">
                <Link href="/products/office">سیستم یکپارچه اتوماسیون اداری</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer whitespace-nowrap transition-colors duration-200">
                <Link href="/products/infi">سیستم های یکپارچه مالی</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer whitespace-nowrap transition-colors duration-200">
                <Link href="/products/humcap">سیستم های سرمایه انسانی</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer whitespace-nowrap transition-colors duration-200">
                <Link href="/products/chat">چت سازمانی</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer whitespace-nowrap transition-colors duration-200">
                <Link href="/products/meetings">مدیریت جلسات</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer whitespace-nowrap transition-colors duration-200">
                <Link href="/products/emailmanagement">مدیریت ایمیل سازمانی</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link href="/helpvideos" className={linkClass("/helpvideos")}>
              ویدیو های آموزشی
            </Link>
          </li>

          <li>
            <Link href="/blog" className={linkClass("/blog")}>
              وبلاگ
            </Link>
          </li>

          <li>
            <Link href="/about" className={linkClass("/about")}>
              درباره ما
            </Link>
          </li>

          <li>
            <Link href="/contact" className={linkClass("/contact")}>
              تماس با ما
            </Link>
          </li>
        </ul>

        {/* ✅ جستجو و منوی موبایل */}
        <div className="flex items-center justify-between w-full lg:w-auto py-1">
          <div className="order-2">
            <SearchInput />
          </div>

          <button
            className="lg:hidden text-gray-200 text-2xl ml-3 order-1 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* ✅ پس‌زمینه‌ی محو موبایل */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "bg-black/50 backdrop-blur-md bg-opacity-50 visible opacity-100 w-full h-screen"
            : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* ✅ منوی کناری موبایل */}
      <div
        className={`fixed top-0 right-0 bottom-0 h-screen w-64 bg-gray-900 text-gray-200 z-[2147483647] transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="font-bold text-sm">منو</span>
          <button onClick={() => setMenuOpen(false)}>
            <FiX className="text-xl cursor-pointer" />
          </button>
        </div>

        <ul className="flex flex-col p-4 space-y-4 bg-gray-900">
          <li>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={pathname === "/" ? "text-yellow-400" : ""}
            >
              صفحه اصلی
            </Link>
          </li>
          <li>
            <Link
              href="/special"
              onClick={() => setMenuOpen(false)}
              className={pathname === "/special" ? "text-yellow-400" : ""}
            >
              ویژگی های شاخص ما
            </Link>
          </li>

          <li>
            <button
              onClick={() => setSubmenuOpen(!submenuOpen)}
              className="flex items-center justify-between w-full text-left"
            >
              محصولات <IoMdArrowDropdown className="ml-1 w-4 h-4" />
            </button>
            <ul
              className={`mr-4 space-y-2 text-sm text-gray-300 overflow-hidden transition-all duration-300 ${
                submenuOpen ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <li>
                <Link href="/products/office" onClick={() => setMenuOpen(false)}>
                  سیستم یکپارچه اتوماسیون اداری
                </Link>
              </li>
              <li>
                <Link href="/products/infi" onClick={() => setMenuOpen(false)}>
                  سیستم های یکپارچه مالی
                </Link>
              </li>
              <li>
                <Link href="/products/humcap" onClick={() => setMenuOpen(false)}>
                  سیستم های سرمایه انسانی
                </Link>
              </li>
              <li>
                <Link href="/products/chat" onClick={() => setMenuOpen(false)}>
                  چت سازمانی
                </Link>
              </li>
              <li>
                <Link href="/products/meetings" onClick={() => setMenuOpen(false)}>
                  مدیریت جلسات
                </Link>
              </li>
              <li>
                <Link href="/products/emailmanagement" onClick={() => setMenuOpen(false)}>
                  مدیریت ایمیل سازمانی
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              href="/helpvideos"
              onClick={() => setMenuOpen(false)}
              className={pathname === "/helpvideos" ? "text-yellow-400" : ""}
            >
              ویدیو های آموزشی
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className={pathname === "/blog" ? "text-yellow-400" : ""}
            >
              وبلاگ
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className={pathname === "/about" ? "text-yellow-400" : ""}
            >
              درباره ما
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className={pathname === "/contact" ? "text-yellow-400" : ""}
            >
              تماس با ما
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
