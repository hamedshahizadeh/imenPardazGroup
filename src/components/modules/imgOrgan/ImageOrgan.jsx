"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function ImagesGallery() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/imgorgan") // تغییر اینجا
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data)) setFiles(data);
        else setFiles([]);
      })
      .catch((err) => {
        console.error("Failed to fetch images list:", err);
        setFiles([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <p className="p-4">در حال بارگذاری تصاویر...</p>;
  if (!files.length) return <p className="p-4">تصویری برای نمایش وجود ندارد.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {files.map((filename) => (
        <div key={filename} className="relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={`/api/imgorgan/${encodeURIComponent(filename)}`} // تغییر اینجا
            alt={filename}
            width={400}
            height={300}
            className="object-cover w-full h-40"
          />
        </div>
      ))}
    </div>
  );
}
