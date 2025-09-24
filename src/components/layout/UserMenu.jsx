"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuMessageCircle } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function UserMenu({ isLoggedIn, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    toast.success("خروج با موفقیت انجام شد");
    setIsOpen(false);
    // اینجا می‌تونی منطق واقعی خروج رو اضافه کنی
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center gap-5" ref={menuRef}>
      {isLoggedIn ? (
        <>
          {/* عکس یوزر */}
          <div
            className="border-2 border-[#49C5B6] rounded-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              src={user?.avatar || "/images/user.jpeg"}
              width={48}
              height={48}
              alt={user?.name || "user"}
              className="rounded-full w-6 h-6"
            />
          </div>

          {/* سایر آیکون‌ها */}
          <LuMessageCircle className="text-gray-300 size-5" />
          <div className="relative inline-block">
            <GoBell className="text-gray-300 size-5" />
            <span className="absolute -top-2 -right-1 block w-2 h-2 rounded-full bg-[#49C5B6] border-2 border-[#49C5B6] animate-pulse"></span>
          </div>
          <div className="relative inline-block">
            <MdOutlineLocalPostOffice className="text-gray-300 size-5" />
            <span className="absolute -top-2 -right-1 block w-2 h-2 rounded-full bg-[#49C5B6] border-2 border-[#49C5B6] animate-pulse"></span>
          </div>

          {/* مودال یوزر */}
          {isOpen && (
            <div className="absolute right-0 top-7 min-w-48 bg-gray-800 text-white rounded-lg shadow-lg p-4 z-50">
              <div className="flex flex-col items-center gap-1">
                <Image
                  src={user?.avatar || "/images/user.jpeg"}
                  width={60}
                  height={60}
                  alt={user?.name || "user"}
                  className="rounded-full w-12 h-12 border-2 border-[#49C5B6]"
                />
                <h6 className="font-medium text-sm text-white break-words">
                  {user?.name}
                </h6>
                <p className="text-xs font-medium text-gray-400 break-words">
                  {user?.email}
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-2 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs cursor-pointer px-3 py-1 rounded transition"
                >
                  <FaSignOutAlt />
                  خروج
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          href="/auth/login"
          className="font-medium text-xs lg:text-sm flex items-center gap-1 text-yellow-500 hover:text-yellow-600 transition"
        >
          <FaSignInAlt />
          ورود | ثبت نام
        </Link>
      )}
    </div>
  );
}
