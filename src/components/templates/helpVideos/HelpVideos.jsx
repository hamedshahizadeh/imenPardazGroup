"use client";

import { useState, useEffect } from "react";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        const data = await response.json();
        if (data?.videos && Array.isArray(data.videos)) {
          setVideos(data.videos);
        } else {
          console.error("Data is not an array:", data);
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // جلوگیری از راست‌کلیک و کلیدهای خاص
  useEffect(() => {
    const preventContextMenu = (e) => e.preventDefault();
    const preventKeys = (e) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
        alert("این عمل غیرمجاز است!");
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventKeys);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventKeys);
    };
  }, []);

  const categories = ["همه", ...new Set(videos.map((v) => v.category))];

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

  const filteredItems = videos.filter(
    (c) =>
      (currentCategory === "همه" || c.category === currentCategory) &&
      (c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryClick = (cat) => {
    setCurrentCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400 text-sm">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 pt-20 text-gray-100 select-none">
      <div className="flex flex-wrap gap-2 px-4 md:px-6 lg:px-16 xl:px-12 py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-3 font-bold py-2 text-xs rounded-lg cursor-pointer transition duration-200 ${
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
          className="w-[50%] px-4 py-2 text-sm font-medium rounded-md bg-gray-800 text-white placeholder-gray-400"
        />
      </div>

      <main className="flex-grow px-4 md:px-6 lg:px-16 xl:px-12 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {paginatedItems.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-sm py-10">
            هیچ ویدیو ای یافت نشد.
          </div>
        )}

        {paginatedItems.map((card, i) => (
          <article
            key={card._id || card.id || i}
            className="bg-slate-900 rounded-lg shadow-md overflow-hidden flex flex-col h-80"
          >
            <div className="relative w-full h-52">
              <div className="absolute top-0 left-0 text-xs font-medium bg-black/50 backdrop-blur-md text-white px-2 py-1 z-10">
                <p>imenpardazgroup.ir</p>
              </div>

              <video
                className="w-full h-52 object-cover"
                poster={`/api/videos/file/${encodeURIComponent(card.thumbnail || "")}`}
                controls
                controlsList="nodownload  noremoteplayback"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                playsInline
              >
                <source src={`/api/videos/file/${encodeURIComponent(card.videoUrl || "")}`} type="video/mp4" />
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            </div>

            <div className="flex-1 p-4 flex flex-col">
              <h3 className="text-gray-300 font-bold text-sm mb-2">{card.title}</h3>
              <p className="text-gray-400 text-xs font-medium text-justify line-clamp-3 mb-4">{card.description}</p>
            </div>
          </article>
        ))}
      </main>

      <div className="flex justify-center gap-2 py-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-[#49C5B6] text-white" : "bg-gray-700 text-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
