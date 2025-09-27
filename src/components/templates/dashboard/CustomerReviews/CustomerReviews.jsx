"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "علی رضایی",
      text: "خیلی راضی بودم، پشتیبانی عالی بود.",
      image: "/default-avatar.png",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newReview, setNewReview] = useState({ name: "", text: "", image: "" });
  const [preview, setPreview] = useState("");
  const [currentReview, setCurrentReview] = useState(null);

  // --- افزودن ---
  const openAddModal = () => {
    setNewReview({ name: "", text: "", image: "" });
    setPreview("");
    setShowAddModal(true);
  };
  const closeAddModal = () => setShowAddModal(false);

  const handleImageChange = (e, type = "add") => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "add") {
        setPreview(imageUrl);
        setNewReview((prev) => ({ ...prev, image: imageUrl }));
      } else {
        setCurrentReview((prev) => ({ ...prev, image: imageUrl }));
      }
    }
  };

  const handleSave = () => {
    if (!newReview.name || !newReview.text) {
      return toast.error("لطفا همه فیلد هارا پر کنید!");
    }
    setReviews((prev) => [
      ...prev,
      {
        ...newReview,
        id: Date.now(),
        image: newReview.image || "/default-avatar.png",
      },
    ]);
    toast.success("نظر جدید با موفقیت اضافه شد");
    closeAddModal();
  };

  // --- ویرایش ---
  const openEditModal = (review) => {
    setCurrentReview({ ...review });
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);

  const handleUpdate = () => {
    if (!currentReview.name || !currentReview.text) {
      return toast.error("لطفا همه فیلد هارا پر کنید!");
    }
    setReviews((prev) =>
      prev.map((r) => (r.id === currentReview.id ? currentReview : r))
    );
    toast.success("نظر جدید با موفقیت ویرایش شد");

    closeEditModal();
  };

  // --- حذف ---
  const openDeleteModal = (review) => {
    setCurrentReview(review);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => setShowDeleteModal(false);

  const handleDelete = () => {
    setReviews((prev) => prev.filter((r) => r.id !== currentReview.id));
    closeDeleteModal();
    toast.success("نظر شما با موفقیت حذف شد");
  };

  return (
    <div className=" container">
      <div className="flex justify-end">
        {/* دکمه افزودن نظر */}
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#49C5B6] hover:bg-[#37a199] text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition shadow-md"
        >
          <FaPlus /> افزودن نظر جدید
        </button>
      </div>
      {/* لیست نظرات */}
      <div className="mt-6 space-y-2">
        {[...reviews]
          .slice()
          .reverse()
          .map((review) => (
            <div
              key={review.id}
              className=" p-3 bg-gray-900/60 rounded-xl shadow"
            >
              <div className="flex items-start gap-3">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="lg:w-16 lg:h-16 w-12 h-12 md:w-14 md:h-14 object-cover"
                />
                <div>
                  <h3 className=" text-xs md:text-sm font-bold text-white">
                    {review.name}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm text-justify font-medium">{review.text}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => openEditModal(review)}
                  className="flex items-center gap-1 px-2 py-1 text-xs cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  <FaEdit /> ویرایش
                </button>
                <button
                  onClick={() => openDeleteModal(review)}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded transition"
                >
                  <FaTrashAlt /> حذف
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* مودال افزودن */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">
              افزودن نظر مشتری
            </h2>
            <div className="flex flex-col gap-3 text-xs md:text-sm font-medium text-gray-200 mb-2 md:mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <Image
                  src={preview}
                  alt="preview"
                  width={64}
                  height={64}
                  className="mt-2 w-full h-20 object-cover"
                />
              )}
              <input
                type="text"
                placeholder="نام"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 mt-3 rounded-lg bg-gray-800 text-white text-sm"
              />
              <textarea
                placeholder="متن نظر"
                value={newReview.text}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, text: e.target.value }))
                }
                className="w-full px-3 py-2 mt-3 rounded-lg bg-gray-800 text-white text-sm"
                rows="3"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleSave}
                className="px-3 py-2 text-sm bg-emerald-600 cursor-pointer text-white rounded-lg"
              >
                ذخیره
              </button>
              <button
                onClick={closeAddModal}
                className="px-3 py-2 text-sm bg-gray-700  cursor-pointer text-white rounded-lg"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال ویرایش */}
      {showEditModal && currentReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">
              ویرایش نظر مشتری
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "edit")}
            />
            {currentReview.image && (
              <Image
                src={currentReview.image}
                alt="preview"
                width={64}
                height={64}
                className="mt-2 rounded-full object-cover"
              />
            )}
            <input
              type="text"
              value={currentReview.name}
              onChange={(e) =>
                setCurrentReview((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 mt-3 rounded-lg bg-gray-800 text-white text-sm"
            />
            <textarea
              value={currentReview.text}
              onChange={(e) =>
                setCurrentReview((prev) => ({ ...prev, text: e.target.value }))
              }
              className="w-full px-3 py-2 mt-3 rounded-lg bg-gray-800 text-white text-sm"
              rows="3"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleUpdate}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg cursor-pointer"
              >
                بروزرسانی
              </button>
              <button
                onClick={closeEditModal}
                className="px-3 py-2 text-sm bg-gray-700 text-white rounded-lg cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال حذف */}
      {showDeleteModal && currentReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <p className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">
              آیا مطمئن هستید می‌خواهید نظر{" "}
              <b className=" mb-2 md:mb-4 text-[#49C5B6]">
                {currentReview.name}
              </b>{" "}
              را حذف کنید؟
            </p>
            <div className="flex justify-center gap-4 mt-2 md:mt-3 lg:mt-4">
              <button
                onClick={handleDelete}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                حذف
              </button>
              <button
                onClick={closeDeleteModal}
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
