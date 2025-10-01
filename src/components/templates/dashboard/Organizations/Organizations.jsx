"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function Organizations() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  // 📌 گرفتن لیست تصاویر
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/imgorgan");
      const data = await res.json();
      if (Array.isArray(data)) setFiles(data);
      else setFiles([]);
    } catch (err) {
      console.error("Failed to fetch images:", err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // 📌 آپلود عکس
  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");
      console.log(data);
      
      toast.success("عکس با موفقیت اضافه شد");
      fetchImages(); // رفرش لیست بعد از آپلود
    } catch (err) {
      toast.error("خطا در آپلود عکس: " + err.message);
    }
  };

  // 📌 باز کردن مودال حذف
  const openDeleteModal = (filename) => {
    setImageToDelete(filename);
    setShowDeleteModal(true);
  };

  // 📌 تایید حذف (API DELETE)
  const confirmDeleteImage = async () => {
    if (!imageToDelete) return;

    try {
      const res = await fetch(
        `/api/imgorgan/${encodeURIComponent(imageToDelete)}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("حذف انجام نشد");

      toast.success("عکس با موفقیت حذف شد");
      fetchImages(); // رفرش لیست بعد از حذف
    } catch (err) {
      toast.error("خطا در حذف عکس: " + err.message);
    } finally {
      setShowDeleteModal(false);
      setImageToDelete(null);
    }
  };

  return (
    <div className="container">
      <div className="mb-4 flex justify-end">
        <label
          htmlFor="imageUpload"
          className="flex items-center gap-2 bg-[#49C5B6] hover:bg-[#37a199] text-white text-xs px-2 py-1 cursor-pointer rounded transition shadow-md"
        >
          <FaPlus /> افزودن سازمان جدید
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden"
          onChange={handleAddImage}
        />
      </div>

      {/* 📌 گالری عکس‌ها */}
      {loading ? (
        <p className="p-4">در حال بارگذاری تصاویر...</p>
      ) : !files.length ? (
        <p className="p-4">تصویری برای نمایش وجود ندارد.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((filename) => (
            <div
              key={filename}
              className="relative rounded-lg overflow-hidden shadow-lg group"
            >
              <Image
                src={`/api/imgorgan/${encodeURIComponent(filename)}`}
                alt={filename}
                width={400}
                height={300}
                className="object-cover w-full h-40"
                priority
              />
              <button
                onClick={() => openDeleteModal(filename)}
                className="absolute top-2 cursor-pointer right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 📌 مودال حذف */}
      {showDeleteModal && imageToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-sm font-medium text-white mb-2">حذف عکس</h2>
            <p className="text-gray-300 mb-4">
              آیا مطمئن هستید که می‌خواهید این عکس را حذف کنید؟
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={confirmDeleteImage}
                className="px-3 py-2 text-sm font-medium cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                حذف
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 text-sm font-medium cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
