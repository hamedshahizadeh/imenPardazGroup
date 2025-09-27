"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaVideo, FaEdit, FaFolderPlus } from "react-icons/fa";

const initialVideos = [
  {
    id: 1,
    title: "جلسه 12 Node.js",
    description: "Express و Routing.",
    video: "./video12.mp4",
    poster: "./poster12.jpg",
    category: "Node.js",
  },
  {
    id: 2,
    title: "جلسه 5 React",
    description: "کامپوننت‌ها و Props.",
    video: "./video5.mp4",
    poster: "./poster5.jpg",
    category: "React",
  },
];

export default function VideosPage() {
  const [videos, setVideos] = useState(initialVideos);
  const [categories, setCategories] = useState(["Node.js", "React"]);

  // مودال‌ها
  const [showAddModal, setShowAddModal] = useState(false);
  const [animateAddModal, setAnimateAddModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [animateDeleteModal, setAnimateDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [animateEditModal, setAnimateEditModal] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);

  // مدیریت نمایش مودال دسته‌بندی
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [animateCategoryModal, setAnimateCategoryModal] = useState(false);

  // فیلدهای افزودن ویدیو
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    video: null,
    poster: null,
    category: "",
  });

  // فیلد دسته‌بندی جدید
  const [newCategory, setNewCategory] = useState("");

  // انیمیشن مودال‌ها
  useEffect(() => {
    if (showAddModal) setTimeout(() => setAnimateAddModal(true), 10);
    else setAnimateAddModal(false);
  }, [showAddModal]);

  useEffect(() => {
    if (showDeleteModal) setTimeout(() => setAnimateDeleteModal(true), 10);
    else setAnimateDeleteModal(false);
  }, [showDeleteModal]);

  useEffect(() => {
    if (showEditModal) setTimeout(() => setAnimateEditModal(true), 10);
    else setAnimateEditModal(false);
  }, [showEditModal]);

  useEffect(() => {
    if (showCategoryModal) setTimeout(() => setAnimateCategoryModal(true), 10);
    else setAnimateCategoryModal(false);
  }, [showCategoryModal]);

  // افزودن ویدیو
  const handleAddVideo = () => {
    if (
      !newVideo.title ||
      !newVideo.description ||
      !newVideo.video ||
      !newVideo.poster ||
      !newVideo.category
    ) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    const newItem = { ...newVideo, id: Date.now() };
    setVideos([newItem, ...videos]);

    if (!categories.includes(newVideo.category)) {
      setCategories([...categories, newVideo.category]);
    }

    setNewVideo({
      title: "",
      description: "",
      video: null,
      poster: null,
      category: "",
    });
    setNewCategory("");
    setShowAddModal(false);
    toast.success("ویدیو با موفقیت افزوده شد");
  };

  // حذف ویدیو
  const handleDeleteVideo = () => {
    setVideos(videos.filter((v) => v.id !== videoToDelete.id));
    setShowDeleteModal(false);
    toast.success("ویدیو حذف شد");
  };

  // ویرایش ویدیو
  const handleEditVideo = () => {
    if (
      !videoToEdit.title ||
      !videoToEdit.description ||
      !videoToEdit.video ||
      !videoToEdit.poster ||
      !videoToEdit.category
    ) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    setVideos(
      videos.map((v) => (v.id === videoToEdit.id ? { ...videoToEdit } : v))
    );
    setShowEditModal(false);
    toast.success("ویدیو با موفقیت ویرایش شد");
  };

  // افزودن دسته‌بندی جدید
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("نام دسته‌بندی نمی‌تواند خالی باشد");
      return;
    }
    if (categories.includes(newCategory)) {
      toast.error("این دسته‌بندی قبلاً وجود دارد");
      return;
    }
    setCategories([...categories, newCategory]);
    setNewVideo({ ...newVideo, category: newCategory });
    setNewCategory("");
    setShowCategoryModal(false);
    toast.success("دسته‌بندی اضافه شد");
  };

  return (
    <div className=" text-gray-200 min-h-screen container">
      {/* دکمه افزودن */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#49C5B6] hover:bg-[#37a199] text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition shadow-md"
        >
          <FaPlus /> افزودن ویدیو جدید
        </button>
      </div>

      {/* لیست ویدیوها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((card) => (
          <article
            key={card.id}
            className="bg-black/60 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden flex flex-col h-80"
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
              <h3 className="text-gray-200 font-medium text-sm mb-1">
                {card.title}
              </h3>
              <p className="text-gray-400 text-xs font-medium text-justify line-clamp-3 mb-2">
                {card.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] text-[#49C5B6] font-medium">
                  {card.category}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setVideoToEdit(card);
                      setShowEditModal(true);
                    }}
                    className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 transition cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setVideoToDelete(card);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* مودال افزودن ویدیو */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50 overflow-y-auto">
          <div
            className={`bg-gray-900/95 backdrop-blur-xl rounded-t-3xl p-6 w-full max-w-md
              transform transition-transform duration-300
              ${animateAddModal ? "translate-y-0" : "translate-y-full"}
              max-h-[90vh] overflow-y-auto`}
          >
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4 text-center">
              <FaVideo className="text-[#49C5B6]" /> افزودن ویدیو جدید
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="عنوان ویدیو"
                value={newVideo.title}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, title: e.target.value })
                }
                className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-gray-200 text-xs md:text-sm focus:ring-2 focus:ring-[#49C5B6]"
              />
              <textarea
                placeholder="توضیحات"
                value={newVideo.description}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, description: e.target.value })
                }
                className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-gray-200 text-xs md:text-sm focus:ring-2 focus:ring-[#49C5B6] h-20"
              />

              {/* فایل ویدیو */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-100 mb-1">ویدیو</label>
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setNewVideo({ ...newVideo, video: file });
                  }}
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-gray-200 text-xs md:text-sm"
                />
                {newVideo.video && (
                  <video
                    className="mt-2 w-full h-32 rounded bg-gray-700"
                    src={URL.createObjectURL(newVideo.video)}
                    controls
                  />
                )}
              </div>

              {/* فایل پوستر */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-100 mb-1">پوستر</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setNewVideo({ ...newVideo, poster: file });
                  }}
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-gray-200 text-xs md:text-sm"
                />
                {newVideo.poster && (
                  <img
                    className="mt-2 w-full h-32 object-cover rounded bg-gray-700"
                    src={URL.createObjectURL(newVideo.poster)}
                    alt="پیش‌نمایش پوستر"
                  />
                )}
              </div>

              {/* دسته‌بندی + دکمه + */}
              <div className="flex items-center gap-2">
                <select
                  value={newVideo.category}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, category: e.target.value })
                  }
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-gray-200 text-xs md:text-sm"
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="p-2 bg-[#49C5B6]/30 hover:bg-[#31CCBA] rounded-lg text-white text-xs cursor-pointer"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleAddVideo}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer  bg-[#49C5B6] hover:bg-[#31CCBA] rounded-lg text-white"
              >
                افزودن
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewVideo({
                    title: "",
                    description: "",
                    video: null,
                    poster: null,
                    category: "",
                  });
                  setNewCategory("");
                }}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال حذف ویدیو */}
      {showDeleteModal && videoToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">
              آیا مطمئن هستید که می‌خواهید ویدیو
            </h2>
            <span className="mb-6 text-[#49C5B6]">{videoToDelete.title}</span>
            را حذف کنید؟
            <div className="flex justify-center gap-4 mt-2 md:mt-3 lg:mt-4">
              <button
                onClick={handleDeleteVideo}
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
      {/* مودال ویرایش ویدیو */}
      {showEditModal && videoToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50 overflow-y-auto">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4 text-center">
              ویرایش ویدیو
            </h2>

            <div className="flex flex-col gap-3 text-xs md:text-sm font-medium text-gray-200 mb-2 md:mb-4">
              {/* عنوان */}
              <label>
                عنوان:
                <input
                  type="text"
                  value={videoToEdit.title}
                  onChange={(e) =>
                    setVideoToEdit({ ...videoToEdit, title: e.target.value })
                  }
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-gray-200 text-xs md:text-sm"
                />
              </label>

              {/* توضیحات */}
              <label>
                توضیحات:
                <textarea
                  value={videoToEdit.description}
                  onChange={(e) =>
                    setVideoToEdit({
                      ...videoToEdit,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-gray-200 text-xs md:text-sm"
                />
              </label>

              {/* پوستر */}
              <label>
                پوستر ویدیو:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setVideoToEdit({ ...videoToEdit, poster: file });
                  }}
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-white"
                />
              </label>
              {videoToEdit.poster && typeof videoToEdit.poster !== "string" && (
                <img
                  src={URL.createObjectURL(videoToEdit.poster)}
                  alt="پیش‌نمایش پوستر"
                  className="w-20 h-20 rounded object-cover mx-auto border-2 border-[#49C5B6]"
                />
              )}

              {/* ویدیو */}
              <label>
                ویدیو:
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setVideoToEdit({ ...videoToEdit, video: file });
                  }}
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-white"
                />
              </label>
              {videoToEdit.video && typeof videoToEdit.video !== "string" && (
                <video
                  src={URL.createObjectURL(videoToEdit.video)}
                  controls
                  className="w-full h-32 mt-2 rounded bg-gray-700"
                />
              )}

              {/* دسته‌بندی */}
              <div className="flex items-center gap-2">
                <select
                  value={videoToEdit.category}
                  onChange={(e) =>
                    setVideoToEdit({ ...videoToEdit, category: e.target.value })
                  }
                  className="flex-1 p-2 rounded-lg bg-gray-800 text-white"
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {/* دکمه افزودن دسته‌بندی جدید */}
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="p-2 bg-[#49C5B6]/30 hover:bg-[#31CCBA] rounded-lg text-white text-sm cursor-pointer"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleEditVideo}
                className="bg-blue-600 text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded hover:bg-blue-700"
              >
                ذخیره
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال دسته‌بندی جدید */}
      {showCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div
            className={`bg-gray-900/95 backdrop-blur-xl rounded-xl p-6 w-full max-w-xs transform transition-all duration-200
              ${
                animateCategoryModal
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
          >
            <h2 className="text-white text-center mb-4 font-medium text-sm flex items-center justify-center gap-2">
              <FaFolderPlus className="text-[#49C5B6]" /> افزودن دسته‌بندی جدید
            </h2>
            <input
              type="text"
              placeholder="نام دسته‌بندی"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-800 text-white mb-4 text-sm font-medium"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleAddCategory}
                className="px-3 py-2 bg-[#49C5B6] cursor-pointer hover:bg-[#31CCBA] rounded-lg text-white text-sm"
              >
                افزودن
              </button>
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setNewCategory("");
                }}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-lg text-gray-200 text-sm"
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
