"use client";

import { FiSearch } from "react-icons/fi";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchInput = ({ placeholder = "جستجو..." }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="relative w-full max-w-sm font-sans font-medium text-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400 w-5 h-5" />
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
        placeholder={placeholder}
        className="
          w-full
          bg-gray-800
          text-white
          placeholder-gray-500
          rounded-md
          pl-10
          pr-3
          py-2
          focus:outline-none
          focus:ring-1
          focus:ring-gray-500
          focus:border-gray-500
          transition
          duration-200
        "
      />
    </div>
  );
};

export default SearchInput;
