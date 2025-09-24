"use client";

import { useState, useEffect } from "react";

const cardsData = [
  {
    title: "جلسه 1 طراحی وب",
    description: "مقدمه‌ای بر طراحی وب.",
    video: "./video1.mp4",
    poster: "./poster1.jpg",
    category: "طراحی وب",
  },
  {
    title: "جلسه 2 طراحی وب",
    description: "ادامه طراحی وب و HTML.",
    video: "./video2.mp4",
    poster: "./poster2.jpg",
    category: "طراحی وب",
  },
  {
    title: "جلسه 3 جاوااسکریپت",
    description: "مقدمه‌ای بر JS.",
    video: "./video3.mp4",
    poster: "./poster3.jpg",
    category: "جاوااسکریپت",
  },
  {
    title: "جلسه 4 جاوااسکریپت",
    description: "مفاهیم پیشرفته JS.",
    video: "./video4.mp4",
    poster: "./poster4.jpg",
    category: "جاوااسکریپت",
  },
  {
    title: "جلسه 5 Tailwind CSS",
    description: "مقدمه بر Tailwind.",
    video: "./video5.mp4",
    poster: "./poster5.jpg",
    category: "طراحی وب",
  },
  {
    title: "جلسه 6 Tailwind CSS",
    description: "Utility-first approach.",
    video: "./video6.mp4",
    poster: "./poster6.jpg",
    category: "طراحی وب",
  },
  {
    title: "جلسه 7 React",
    description: "ساخت کامپوننت‌ها.",
    video: "./video7.mp4",
    poster: "./poster7.jpg",
    category: "React و Next.js",
  },
  {
    title: "جلسه 8 React",
    description: "State و Props.",
    video: "./video8.mp4",
    poster: "./poster8.jpg",
    category: "React و Next.js",
  },
  {
    title: "جلسه 9 Next.js",
    description: "صفحات SSR.",
    video: "./video9.mp4",
    poster: "./poster9.jpg",
    category: "React و Next.js",
  },
  {
    title: "جلسه 10 Next.js",
    description: "API Routes و Dynamic Routing.",
    video: "./video10.mp4",
    poster: "./poster10.jpg",
    category: "React و Next.js",
  },
  {
    title: "جلسه 11 Node.js",
    description: "مفاهیم پایه Backend.",
    video: "./video11.mp4",
    poster: "./poster11.jpg",
    category: "Node.js",
  },
  {
    title: "جلسه 12 Node.js",
    description: "Express و Routing.",
    video: "./video12.mp4",
    poster: "./poster12.jpg",
    category: "Node.js",
  },
];

export default function VideoGallery() {
  const [currentCategory, setCurrentCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const categories = ["همه", ...new Set(cardsData.map((c) => c.category))];

  // تغییر itemsPerPage با تغییر سایز صفحه
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) setItemsPerPage(8);
      else if (width >= 1024) setItemsPerPage(6);
      else if (width >= 768) setItemsPerPage(4);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredItems = cardsData.filter(
    (c) =>
      (currentCategory === "همه" || c.category === currentCategory) &&
      (c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryClick = (cat) => {
    setCurrentCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 pt-20">
      <div className="flex flex-wrap gap-2 px-4 md:px-6 lg:px-16 xl:px-12 py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-3 font-bold  py-2 text-xs rounded-lg cursor-pointer transition duration-200 ${
              currentCategory === cat
                ? "bg-[#49C5B6] text-white"
                : "bg-gray-700 text-gray-200 hover:bg-[#49C5B6] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

    
      <div className="px-4 md:px-6 lg:px-16 xl:px-12 py-2 flex justify-center">
        <input
          type="text"
          placeholder="جستجو در ویدیوها..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="w-[50%] px-4 py-2 text-sm font-medium  rounded-md bg-gray-800 text-white placeholder-gray-400"
        />
      </div>

      {/* کارت‌ها */}
      <main className="flex-grow px-4 md:px-6 lg:px-16 xl:px-12 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {paginatedItems.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-10 text-base">
            چیزی یافت نشد.
          </div>
        )}

        {paginatedItems.map((card, i) => (
          <article
            key={i}
            className="bg-slate-900 rounded-lg shadow-md overflow-hidden flex flex-col h-80"
          >
            <div className="relative w-full h-52">
              <video
                className="w-full h-52 object-cover"
                poster={card.poster}
                controls
              >
                <source src={card.video} type="video/mp4" />
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            </div>
            <div className="flex-1 p-4 flex flex-col">
              <h3 className="text-gray-300 font-bold text-sm mb-2">
                {card.title}
              </h3>
              <p className="text-gray-400 text-xs font-medium text-justify line-clamp-3 mb-4">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </main>

      {/* صفحه‌بندی */}
      <div className="flex justify-center gap-2 py-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-[#49C5B6] text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>


    </div>
  );
}
