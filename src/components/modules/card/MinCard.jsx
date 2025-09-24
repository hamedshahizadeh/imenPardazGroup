import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClock } from "react-icons/fa6";

export default function MinCard(c) {
  return (
    <Link
      href={`/cards/${c.id}`}
      className="p-2 hover:bg-gray-800 transition flex gap-2 items-center bg-slate-900 rounded-xl my-2"
    >
      <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden">
        <Image src={c.img} alt={c.alt} fill className="object-cover" priority />
      </div>
  <div className="flex-1 flex flex-col h-16"> 
  <h3 className="text-gray-200 text-xs mb-1 font-black line-clamp-1">
    {c.title}
  </h3>
  <p className="text-gray-400 text-xs font-medium line-clamp-1 mb-1">
    {c.description}
  </p>
  <div className="flex gap-1 mt-auto">
    <FaClock className="text-[#49C5B6] size-3" />
    <span className="text-gray-400 text-xs ">{c.date}</span>
  </div>
</div>
    </Link>
  );
}
