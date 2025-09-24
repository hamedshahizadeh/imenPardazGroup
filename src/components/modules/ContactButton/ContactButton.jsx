"use client";
import { MdSupportAgent } from "react-icons/md";

export default function SupportButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href="/support"
        className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 bg-red-600 text-white rounded-full 
                   flex items-center justify-center shadow-lg cursor-pointer 
                   animate-bounce-slow relative"
      >
        <MdSupportAgent className="size-6 md:size-7 lg:size-8 " />
      </a>
      <span
        className="absolute right-20 top-1/2 -translate-y-1/2 
                       bg-gray-800 text-white text-sm px-3 py-1 rounded-md
                       opacity-0 invisible
                       group-hover:opacity-100 group-hover:visible
                       transition-all duration-300
                       whitespace-nowrap
                       shadow-lg"
      >
        تماس با ما
      </span>
    </div>
  );
}
