"use client";

import { useState } from "react";
import Card from "@/components/modules/card/Card";
import cards from "@/data/datas";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaImage,
  FaHeading,
  FaAlignLeft,
  FaFileAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function DashBlog() {
  const [published, setPublished] = useState(
    cards.reduce((acc, card) => {
      acc[card.id] = true;
      return acc;
    }, {})
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [mode, setMode] = useState("create"); // create | edit

  // فیلدهای فرم
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [alt, setAlt] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // باز کردن مودال برای ایجاد
  const handleNewBlog = () => {
    setMode("create");
    resetForm();
    setShowFormModal(true);
  };

  // باز کردن مودال برای ویرایش
  const handleEdit = (card) => {
    setMode("edit");
    setSelectedCard(card);
    setTitle(card.title);
    setDescription(card.description);
    setContent(card.content);
    setAlt(card.alt);
    setPreview(card.img);
    setImage(null);
    setShowFormModal(true);
  };

  // ریست فرم
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setAlt("");
    setImage(null);
    setPreview(null);
  };

  // تغییر فایل عکس
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ثبت ساخت/ویرایش
  const handleSubmit = () => {
    if (mode === "create") {
      toast.success("مقاله جدید با موفقیت ساخته شد ");
    } else {
      toast.success(`مقاله "${title}" با موفقیت ویرایش شد `);
    }
    setShowFormModal(false);
    resetForm();
  };

  const handleTogglePublish = (id) => {
    setPublished((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    toast.success(`وبلاگ "${selectedCard.title}" با موفقیت حذف شد`);
    setShowDeleteModal(false);
    setSelectedCard(null);
  };

  return (
    <div className="space-y-6 container">
      <div className="flex justify-end">
        <button
          onClick={handleNewBlog}
          className="flex items-center gap-2 bg-[#49C5B6] hover:bg-[#37a199] text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition shadow-md"
        >
          <FaPlus /> ساخت مقاله جدید
        </button>
      </div>

      {/* کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-4"
          >
            <Card {...card} />
            <div className="flex justify-between items-center mt-4 gap-2">
              <button
                onClick={() => handleEdit(card)}
                className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-700 text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition"
              >
                <FaEdit /> ویرایش
              </button>

              <button
                onClick={() => handleDeleteClick(card)}
                className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700 text-white text-[10px] md:text-xs  px-2 py-1 cursor-pointer rounded transition"
              >
                <FaTrash /> حذف
              </button>

              <button
                onClick={() => handleTogglePublish(card.id)}
                className={`flex items-center gap-2 text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition ${
                  published[card.id]
                    ? "bg-green-600/80 hover:bg-green-700 text-white"
                    : "bg-gray-700/80 hover:bg-gray-600 text-gray-200"
                }`}
              >
                {published[card.id] ? (
                  <>
                    <FaEye /> منتشر شده
                  </>
                ) : (
                  <>
                    <FaEyeSlash /> پیش‌نویس
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* مودال فرم (ساخت/ویرایش) */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3 mt-20 mb-14">
          <div
            className="bg-white/10 backdrop-blur-lg px-3 py-2 rounded-2xl shadow-lg w-full max-w-xl 
                    space-y-2 max-h-[90vh] overflow-y-auto my-[10px]"
          >
            <h2 className="text-center text-sm md:text-base font-bold text-[#49C5B6] mb-4">
              {mode === "create" ? "ساخت مقاله جدید" : "ویرایش مقاله"}
            </h2>

            {/* انتخاب عکس */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300 flex items-center gap-2">
                <FaImage className="text-[#49C5B6]" />
                انتخاب تصویر
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-xs text-gray-300"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded-md mt-2"
                />
              )}
            </div>

            {/* عنوان */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300 flex items-center gap-2">
                <FaHeading className="text-[#49C5B6]" />
                عنوان مقاله
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md p-2 text-xs bg-black/30 border border-gray-600 text-gray-200"
              />
            </div>

            {/* توضیحات */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300 flex items-center gap-2">
                <FaAlignLeft className="text-[#49C5B6]" />
                توضیحات
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md p-2 text-xs bg-black/30 border border-gray-600 text-gray-200 h-20"
              />
            </div>

            {/* متن مقاله */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300 flex items-center gap-2">
                <FaAlignLeft className="text-[#49C5B6]" />
                متن مقاله
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-md p-2 text-xs bg-black/30 border border-gray-600 text-gray-200 h-24"
              />
            </div>

            {/* دکمه‌ها */}
            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={handleSubmit}
                className="px-3 py-2 text-xs rounded-md bg-[#49C5B6] hover:bg-[#37a199] text-white cursor-pointer"
              >
                  {mode === "create" ? "ساخت مقاله " : "ویرایش مقاله"}
              </button>
                   <button
                onClick={() => setShowFormModal(false)}
                className="px-3 py-2 text-xs rounded-md bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">
              آیا مطمئن هستید که می‌خواهید وبلاگ{" "}
              <span className="text-[#49C5B6]">"{selectedCard?.title}"</span> را
              حذف کنید؟
            </h2>
            <div className="flex justify-center gap-4 mt-2 md:mt-3 lg:mt-4">
              <button
                onClick={confirmDelete}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                بله، حذف شود
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
