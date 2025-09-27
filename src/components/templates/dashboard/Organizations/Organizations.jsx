"use client";
import { useState } from "react";
import Image from "next/image";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function Organizations() {
  const [images, setImages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImages((prev) => [...prev, { id: Date.now(), url: ev.target.result }]);
      toast.success("عکس با موفقیت اضافه شد ");
    };
    reader.readAsDataURL(file);
  };

  const openDeleteModal = (img) => {
    setImageToDelete(img);
    setShowDeleteModal(true);
  };

  const confirmDeleteImage = () => {
    setImages((prev) => prev.filter((img) => img.id !== imageToDelete.id));
    toast.success("عکس با موفقیت حذف شد ");
    setShowDeleteModal(false);
    setImageToDelete(null);
  };

  return (
    <div className="container">
      {/* دکمه آپلود عکس */}
      <div className="mb-4 flex justify-end">
        <label
          htmlFor="imageUpload"
          className="flex items-center gap-2 bg-[#49C5B6] hover:bg-[#37a199] text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition shadow-md"
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

      {/* نمایش لیست عکس‌ها */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative rounded-lg overflow-hidden shadow-lg group"
          >
            <Image
              src={img.url}
              alt="Organization"
              width={400}
              height={300}
              className="object-cover w-full h-40"
            />
            <button
              onClick={() => openDeleteModal(img)}
              className="absolute top-2 right-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>

      {/* مودال حذف */}
      {showDeleteModal && imageToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">حذف عکس</h2>
            <p className="text-gray-300 md:text-sm font-medium  mb-2 md:mb-4">
              آیا مطمئن هستید که می‌خواهید این عکس را حذف کنید؟
            </p>
            <div className="flex justify-center gap-4 mt-2 md:mt-3 lg:mt-4">
                 <button
                onClick={confirmDeleteImage}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                حذف
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
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
