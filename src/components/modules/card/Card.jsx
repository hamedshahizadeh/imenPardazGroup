import Image from "next/image";
import Link from "next/link";
import { FaClock } from "react-icons/fa6";

export default function Card({ img, date, title, description, id }) {
  return (
    <div className="bg-slate-900 rounded-lg shadow-md overflow-hidden w-full h-72 flex flex-col">
      <div className="relative w-full h-32">
        <Image
          priority
          src={img}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex gap-1 mb-1">
          <FaClock className="text-[#49C5B6] size-3" />
          <span className="text-gray-400 text-xs mb-1">{date}</span>
        </div>
        <h3 className="text-gray-300 font-bold text-sm mb-2">{title}</h3>

        <p className="text-gray-400 text-sm font-medium text-justify line-clamp-2 mb-4">
          {description}
        </p>

        <div className="mt-auto">
          <Link
            href={`/cards/${id}`}
            className="text-[#49C5B6] hover:text-[#31CCBA] text-xs font-medium"
          >
            بیشتر بدانید →
          </Link>
        </div>
      </div>
    </div>
  );
}
