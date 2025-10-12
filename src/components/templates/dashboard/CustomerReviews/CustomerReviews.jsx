"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newReview, setNewReview] = useState({ name: "", text: "" });
  const [preview, setPreview] = useState("");
  const [currentReview, setCurrentReview] = useState(null);

  // --- افزودن ---
  const openAddModal = () => {
    setNewReview({ name: "", text: "" });
    setPreview("");
    setShowAddModal(true);
  };
  const closeAddModal = () => setShowAddModal(false);

  const fetchReviews = async () => {
    try {
      setLoadingFetch(true);
      const res = await fetch("/api/dashboard/feedback");
      const data = await res.json();
      setReviews(data.reviews.reverse() || []);
    } catch (error) {
      toast.error(" دریافت اطلاعات  ناموفق بود");
    } finally {
      setLoadingFetch(false);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSave = async () => {
    if (!newReview.name || !newReview.text)
      return toast.error("همه فیلدها الزامی‌اند");
    setLoadingAdd(true);
    const res = await fetch("/api/dashboard/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newReview.name, text: newReview.text }),
    });

    const data = await res.json();
    if (res.ok) {
    setLoadingAdd(false);

      toast.success("نظر ثبت شد");
      setShowAddModal(false);
      setReviews((prev) => [data.newReview, ...prev]);
    } else {
        setLoadingAdd(false);
      toast.error(data.error || "خطا در ثبت نظر");
    }
  };

  // --- ویرایش ---
  const openEditModal = (review) => {
    setCurrentReview({ ...review });
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);

  const handleUpdate = async () => {
    setLoadingEdit(true)
    const res = await fetch(`/api/dashboard/feedback/${currentReview._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: currentReview.name,
        text: currentReview.text,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setReviews((prev) =>
        prev.map((r) => (r._id === currentReview._id ? data.updated : r))
      );
      toast.success("ویرایش انجام شد");
      setShowEditModal(false);
    setLoadingEdit(false)

    } else {
      toast.error(data.error || "خطا در ویرایش");
    setLoadingEdit(false)

    }
  };

  // --- حذف ---
  const openDeleteModal = (review) => {
    setCurrentReview(review);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => setShowDeleteModal(false);

  const handleDelete = async () => {
    setLoadingDelete(true);

    const res = await fetch(`/api/dashboard/feedback/${currentReview._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r._id !== currentReview._id));
      toast.success("نظر حذف شد");
      setShowDeleteModal(false);
      setLoadingDelete(false);
    } else {
      toast.error("خطا در حذف نظر");
      setLoadingDelete(false);
    }
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

      {loadingFetch ? (
        <p className="text-center text-gray-400 text-sm">در حال بارگذاری...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">هیچ نظری یافت نشد</p>
      ) : (
        <div className="mt-6 space-y-2">
          {[...reviews]
            .slice()
            .reverse()
            .map((review) => (
              <div
                key={review._id}
                className=" p-3 bg-gray-900/60 rounded-xl shadow"
              >
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className=" text-xs md:text-sm font-bold text-white">
                      {review.name}
                    </h3>
                    <p className="text-gray-300 text-xs md:text-sm text-justify font-medium">
                      {review.text}
                    </p>
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
      )}
      {/* مودال افزودن */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">
              افزودن نظر مشتری
            </h2>
            <div className="flex flex-col gap-3 text-xs md:text-sm font-medium text-gray-200 mb-2 md:mb-4">
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
                   {loadingAdd ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : (
                  "افزودن"
                )}
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
                className="px-3 flex items-center justify-center py-2 text-sm bg-blue-600 text-white rounded-lg cursor-pointer"
              >
                  {loadingEdit ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : (
                  "بروزرسانی"
                )}
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
                disabled={loadingDelete}
                onClick={handleDelete}
                className="px-3 flex justify-center items-center py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                {loadingDelete ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "حذف"
                )}
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
