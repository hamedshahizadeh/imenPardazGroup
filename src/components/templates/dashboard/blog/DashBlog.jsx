"use client";

import { useState, useEffect } from "react";
import {
  FaPlus,
  FaImage,
  FaHeading,
  FaAlignLeft,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function DashBlog() {
  const [loadingPublish, setLoadingPublish] = useState({});
  const [cards, setCards] = useState([]); // بلاگ‌ها
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [mode, setMode] = useState("create"); // create | edit
  const [selectedCard, setSelectedCard] = useState(null);

  // فرم بلاگ
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [published, setPublished] = useState({});

  // --- دریافت بلاگ‌ها از سرور ---
  const fetchBlogs = async () => {
    try {
      setLoadingFetch(true);
      const res = await fetch("/api/dashboard/blog");
      const data = await res.json();
      if (res.ok) {
        setCards(data.blogs.reverse() || []);
        // وضعیت انتشار را بر اساس داده سرور
        const pubStatus = {};
        (data.blogs || []).forEach((b) => {
          pubStatus[b._id] = b.published;
        });
        setPublished(pubStatus);
      } else {
        throw new Error(data.error || "خطا در دریافت بلاگ‌ها");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingFetch(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // --- باز کردن مودال ساخت بلاگ ---
  const handleNewBlog = () => {
    resetForm();
    setMode("create");
    setShowFormModal(true);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setImage(null);
    setPreview("");
    setSelectedCard(null);
  };

  // --- ثبت یا ویرایش بلاگ ---
  const handleSubmit = async () => {
    if (!title || !description || !content || (!image && mode === "create")) {
      toast.error("لطفاً همه فیلدها و تصویر را وارد کنید");
      return;
    }
    setLoadingAdd(true);

    try {
      let imgUrl = preview;

      if (image && mode === "create") {
        const formData = new FormData();
        formData.append("file", image);
        const res = await fetch("/api/imgblog/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        imgUrl = data.url || `/api/imgblog/${data.filename}`;
      }

      // حذف /api/imgblog/ از URL
      const cleanImgUrl = imgUrl ? imgUrl.replace(/^\/api\/imgblog\//, "") : "";

      if (mode === "create") {
        const newBlog = {
          title,
          description,
          content,
          image: cleanImgUrl,
          published: false,
        };

        const res = await fetch("/api/dashboard/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBlog),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "خطا در ثبت بلاگ");
        toast.success("مقاله جدید با موفقیت ثبت شد");
        await fetchBlogs();

        setShowFormModal(false);
        resetForm();
      } else if (mode === "edit" && selectedCard) {
        try {
          const updatedBlog = {
            title,
            description,
            content,
          };
          const res = await fetch(
            `/api/dashboard/blog/edit/${selectedCard._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedBlog),
            }
          );

          const result = await res.json();
          if (!res.ok) throw new Error(result.error || "خطا در ویرایش بلاگ");

          toast.success("مقاله با موفقیت ویرایش شد");
          await fetchBlogs();
          setShowFormModal(false);
          resetForm();
        } catch (err) {
          toast.error("خطا در ویرایش مقاله: " + err.message);
        }
      }
    } catch (err) {
      toast.error("خطا در آپلود یا ثبت مقاله: " + err.message);
    } finally {
      setLoadingAdd(false);
    }
  };

  // باز کردن مودال ویرایش
  const handleEdit = (card) => {
    setSelectedCard(card);
    setTitle(card.title);
    setDescription(card.description);
    setContent(card.content);
    setPreview(card.img);
    setImage(null);
    setMode("edit");
    setShowFormModal(true);
  };

  // باز کردن مودال حذف
  const handleDelete = (card) => {
    setSelectedCard(card);
    setShowDeleteModal(true);
  };

  // تایید حذف
  const confirmDelete = async () => {
    if (!selectedCard) return;

    try {
      setLoadingDelete(true);
      const filename = selectedCard.image.split("/").pop();

      const res = await fetch(`/api/imgblog/${filename}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "حذف عکس با مشکل مواجه شد");
      }
      const resapi = await fetch(`/api/dashboard/blog/${filename}`, {
        method: "DELETE",
      });
      if (!resapi.ok) {
        const data = await resapi.json();
        throw new Error(data.error || "حذف بلاگ با مشکل مواجه شد");
      }

      toast.success(`مقاله "${selectedCard.title}" و عکس آن حذف شد`);
      await fetchBlogs();
      setShowDeleteModal(false);
      setSelectedCard(null);
    } catch (err) {
      toast.error("خطا در حذف مقاله یا عکس: " + err.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  // انتخاب فایل
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const togglePublish = async (id) => {
    setLoadingPublish((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`/api/dashboard/blog/publish/${id}`, {
        method: "PUT",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطا در تغییر وضعیت انتشار");

      setPublished((prev) => {
        const newState = { ...prev, [id]: !prev[id] };
        return newState;
      });

      toast.success("وضعیت انتشار بلاگ تغییر کرد");
    } catch (err) {
      toast.error("خطا در تغییر وضعیت انتشار: " + err.message);
    } finally {
      setLoadingPublish((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="container space-y-4">
      {/* دکمه ساخت مقاله جدید */}
      <div className="flex justify-end">
        <button
          onClick={handleNewBlog}
          className="flex items-center cursor-pointer gap-2 bg-[#49C5B6] hover:bg-[#37a199] text-white text-xs px-2 py-1 rounded transition"
        >
          <FaPlus /> ساخت مقاله جدید
        </button>
      </div>



      {loadingFetch ? (
        <p className="text-center text-gray-400 text-sm">در حال بارگذاری...</p>
      ) : cards.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">هیچ مقاله ای یافت نشد</p>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card._id}
              className="bg-black/40 h-80 backdrop-blur-sm rounded-2xl shadow-lg p-4 flex flex-col"
            >
              <Image
                src={`/api/dashboard/blog/${card.image}`}
                alt={card.title}
                className="w-full h-40 object-cover rounded-md"
                priority
                width={200}
                height={200}
              />
              <h3 className="text-sm font-bold text-white mt-2">
                {card.title}
              </h3>
              <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                {card.description}
              </p>

              <div className="flex justify-between mt-auto gap-2">
                <button
                  onClick={() => handleEdit(card)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] md:text-xs py-1 rounded transition cursor-pointer"
                >
                  <FaEdit className="inline mr-1" /> ویرایش
                </button>

                <button
                  onClick={() => handleDelete(card)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[10px] md:text-xs py-1 rounded transition cursor-pointer"
                >
                  <FaTrash className="inline mr-1" /> حذف
                </button>

                <button
                  onClick={() => togglePublish(card._id)}
                  className={`flex-1 text-[10px] md:text-xs py-1 rounded transition cursor-pointer ${
                    published[card._id]
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  }`}
                >
                  {loadingPublish[card._id] ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                  ) : published[card._id] ? (
                    <>
                      <FaEye className="inline mr-1" /> منتشر شده
                    </>
                  ) : (
                    <>
                      <FaEyeSlash className="inline mr-1" /> پیش‌نویس
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div> )}

      {/* مودال فرم */}
      {showFormModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 px-3 overflow-y-auto pt-8 md:pt-20 lg:pt-32 z-[9999]">
          <div className="bg-white/10 backdrop-blur-lg px-3 py-4 rounded-2xl shadow-lg w-full max-w-lg space-y-2">
            <h2 className="text-center text-sm md:text-base font-bold text-[#49C5B6] mb-2">
              {mode === "create" ? "ساخت مقاله جدید" : "ویرایش مقاله"}
            </h2>

            {/* انتخاب عکس */}
            <div className="space-y-1">
              {mode === "create" ? (
                <div>
                  <label className="text-xs font-medium text-gray-300 flex items-center gap-2">
                    <FaImage className="text-[#49C5B6]" /> انتخاب تصویر
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
              ) : (
                ""
              )}
            </div>

            {/* عنوان */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300 flex items-center gap-2">
                <FaHeading className="text-[#49C5B6]" /> عنوان مقاله
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
                <FaAlignLeft className="text-[#49C5B6]" /> توضیحات
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
                <FaAlignLeft className="text-[#49C5B6]" /> متن مقاله
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
                disabled={loadingAdd}
                className="bg-green-600 px-3 py-2 text-xs font-medium cursor-pointer rounded-lg text-white hover:bg-green-700 transition disabled:opacity-50"
              >
                {loadingAdd ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : mode === "create" ? (
                  "ساخت مقاله"
                ) : (
                  "ویرایش مقاله"
                )}
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
      {showDeleteModal && selectedCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-3">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-white text-sm font-medium mb-2">
              آیا مطمئن هستید که می‌خواهید مقاله "{selectedCard.title}" را حذف
              کنید؟
            </h2>
            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={confirmDelete}
                className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700 text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition disabled:opacity-50"
                disabled={loadingDelete}
              >
                {loadingDelete ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>حذف</>
                )}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 text-xs cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 text-white"
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
