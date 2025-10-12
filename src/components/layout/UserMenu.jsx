"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuMessageCircle } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react"; // دقت کن از این بیار
import { useRouter } from "next/navigation";
export default function UserMenu({ isLoggedIn, name, email }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const handleLogout = async () => {
    setIsOpen(false);
    await signOut({ redirect: false }); // کوکی و سشن پاک میشه
    toast.success("خروج شما با موفقیت انجام شد");
    router.replace("/");
    router.refresh();
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
    <div className=" flex items-center justify-between w-full">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/logo.png"
          width={200}
          height={200}
          alt="ایمن پرداز"
          className="rounded-full w-8 h-8"
          priority
        />
        <h5 className="text-[#49c5b6] font-bold text-sm hidden md:block">شرکت ایمن پرداز</h5>
      </Link>
      <div className="relative flex flex-row-reverse items-center gap-5 " ref={menuRef}>
        {isLoggedIn ? (
          <>
            {/* عکس یوزر */}
            <div
              className=" cursor-pointer flex items-center gap-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                src={"/images/user.jpeg"}
                width={48}
                height={48}
                alt={name}
                priority
                className=" w-6 h-6 border-2 border-[#49c5b6] rounded-full"
              />
              <div className="flex items-center">
                <h6 className="font-medium text-xs text-white break-words">
                  {name}
                </h6>
                <IoMdArrowDropdown className="text-[#49c5b6] size-5" />
              </div>
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
              <div className="absolute left-2 top-7 min-w-48 bg-gray-800 text-white rounded-lg shadow-lg p-4 z-50">
                <div className="flex flex-col items-center gap-1">
                  <Image
                    src="/images/user.jpeg"
                    width={60}
                    height={60}
                    priority
                    alt={name}
                    className="rounded-full w-12 h-12 border-2 border-[#49C5B6]"
                  />
                  <h6 className="font-medium text-sm text-white break-words">
                    {name}
                  </h6>
                  <p className="text-xs font-medium text-gray-400 break-words">
                    {email}
                  </p>
                  <Link
                    href="/dashboard"
                    className="mt-2 flex items-center gap-2 bg-[#49C5B6] hover:bg-[#45b3a6] text-white text-xs cursor-pointer px-3 py-1 rounded transition"
                  >
                    ورود به پنل
                  </Link>
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
    </div>
  );
}
