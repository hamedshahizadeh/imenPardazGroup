"use client";
import { useState } from "react";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import SearchInput from "../modules/searchInput/SearchInput";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div className="bg-gray-950/80 backdrop-blur-[4PX] font-sans font-medium text-xs">
      <div className="container flex items-center justify-between">
        <ul className="hidden lg:flex items-center gap-3 md:gap-4 lg:gap-5 py-1">
          <li className="bg-[#49C5B6] rounded-lg px-2 hover:bg-[#31ccba] transition-colors">
            <Link
              href="/"
              className="flex items-center cursor-pointer text-gray-50 font-semibold py-1 transition-colors"
            >
              <IoIosHome className="text-white size-4" />
              صفحه اصلی
            </Link>
          </li>
          <li>
            <Link
              href="/special"
              className="flex items-center cursor-pointer text-gray-300 font-semibold py-2 hover:text-[#49C5B6] transition-colors"
            >
               ویژگی های شاخص ما
            </Link>
          </li>
          <li className="relative group">
            <div className="flex items-center cursor-pointer text-gray-300 font-semibold py-2 hover:text-[#49C5B6] transition-colors">
              محصولات <IoMdArrowDropdown className="ml-1 w-4 h-4" />
            </div>
            <ul
              className="absolute right-0 top-full mt-0 w-52 bg-gray-800 text-gray-300 rounded-md shadow-lg
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-opacity duration-300 z-20"
            >
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer whitespace-nowrap transition-colors duration-200">
                <Link href="/products/office">
                  سیستم یکپارچه اتوماسیون اداری
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer whitespace-nowrap transition-colors duration-200">
                <Link href="/products/infi"> سیستم های یکپارچه مالی</Link>
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
                <Link href="/products/emailmanagement">
                  مدیریت ایمیل سازمانی
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href="/helpvideos"
              className="flex items-center cursor-pointer text-gray-300 font-semibold py-2 hover:text-[#49C5B6] transition-colors"
            >
              ویدیو های آموزشی
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="flex items-center cursor-pointer text-gray-300 font-semibold py-2 hover:text-[#49C5B6] transition-colors"
            >
              وبلاگ
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="flex items-center cursor-pointer text-gray-300 font-semibold py-2 hover:text-[#49C5B6] transition-colors"
            >
              درباره ما
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex items-center cursor-pointer text-gray-300 font-semibold py-2 hover:text-[#49C5B6] transition-colors"
            >
              تماس با ما
            </Link>
          </li>
        </ul>

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
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "bg-black/50 backdrop-blur-md bg-opacity-50 visible opacity-100 w-full h-screen"
            : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

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

        <ul className="flex flex-col p-4 space-y-4  bg-gray-900">
          <li>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              صفحه اصلی
            </Link>
          </li>
          <li>
            <Link href="/special" onClick={() => setMenuOpen(false)}>
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
                <Link href="/products/office" onClick={() =>{ setMenuOpen(false) ; setSubmenuOpen(!submenuOpen) } }>
                  سیستم یکپارچه اتوماسیون اداری
                </Link>
              </li>
              <li>
                <Link href="/products/infi" onClick={() =>{ setMenuOpen(false) ; setSubmenuOpen(!submenuOpen) } }>
                  سیستم های یکپارچه مالی
                </Link>
              </li>
              <li>
                <Link
                  href="/products/humcap"
                onClick={() =>{ setMenuOpen(false) ; setSubmenuOpen(!submenuOpen) } }
                >
                  سیستم های سرمایه انسانی
                </Link>
              </li>
              <li>
                <Link href="/products/chat" onClick={() =>{ setMenuOpen(false) ; setSubmenuOpen(!submenuOpen) } }>
                  چت سازمانی
                </Link>
              </li>
              <li>
                <Link href="/products/meetings" onClick={() =>{ setMenuOpen(false) ; setSubmenuOpen(!submenuOpen) } }>
                  مدیریت جلسات
                </Link>
              </li>
              <li>
                <Link
                  href="/products/emailmanagement"
                  onClick={() =>{ setMenuOpen(false) ; setSubmenuOpen(!submenuOpen) } }
                >
                  مدیریت ایمیل سازمانی
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              href="/helpvideos"
              onClick={() => setMenuOpen(false)}
            >
              ویدیو های آموزشی
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={() => setMenuOpen(false)}>
              وبلاگ
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              درباره ما
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              تماس با ما
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
