// src/components/VideosPage.jsx
"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaVideo, FaEdit, FaFolderPlus } from "react-icons/fa";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
    const [loadingFetch, setLoadingFetch] = useState(false);
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [animateAddModal, setAnimateAddModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [animateCategoryModal, setAnimateCategoryModal] = useState(false);

  // Fields
  const [newVideo, setNewVideo] = useState({ title: "", description: "", video: null, poster: null, category: "" });
  const [newCategory, setNewCategory] = useState("");

  // animations
  useEffect(() => {
    if (showAddModal) setTimeout(() => setAnimateAddModal(true), 10);
    else setAnimateAddModal(false);
  }, [showAddModal]);
  useEffect(() => {
    if (showCategoryModal) setTimeout(() => setAnimateCategoryModal(true), 10);
    else setAnimateCategoryModal(false);
  }, [showCategoryModal]);

  // fetch categories & videos
  useEffect(() => {
    
    const load = async () => {
      try {
        setLoadingFetch(true)
        const [vRes, cRes] = await Promise.all([fetch("/api/videos"), fetch("/api/categories")]);

        if (!vRes.ok) throw new Error("Failed to fetch videos");
        if (!cRes.ok) throw new Error("Failed to fetch categories");

        const vJson = await vRes.json();
        const cJson = await cRes.json();

        // ensure array
        setVideos(Array.isArray(vJson.videos) ? vJson.videos : (vJson.videos || []));
        setCategories(Array.isArray(cJson.categories) ? cJson.categories : []);
      } catch (err) {
        setLoadingFetch(false)
        
        console.error(err);
        toast.error("خطا در بارگذاری داده‌ها");
      }finally{
        setLoadingFetch(false)

      }
    };
    load();
  }, []);

  // helper: upload file to endpoint (returns filename)
  const uploadFile = async (file, endpoint) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(endpoint, { method: "POST", body: form });
    if (!res.ok) {
      const txt = await res.text().catch(() => null);
      throw new Error(txt || "Upload failed");
    }
    const json = await res.json();
    return json.filename;
  };

  // Add new category
  const handleAddCategory = async () => {
    const name = newCategory.trim();
    if (!name) return toast.error("نام دسته‌بندی را وارد کنید");
    if (categories.includes(name)) return toast.error("این دسته‌بندی وجود دارد");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error");
      setCategories((p) => [...p, name]);
      setNewCategory("");
      setShowCategoryModal(false);
      toast.success("دسته‌بندی اضافه شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در افزودن دسته‌بندی");
    }
  };

  // Add new video
  const handleAddVideo = async () => {
    try {
      const { title, description, video, poster, category } = newVideo;
      if (!title || !description || !video || !poster || !category) return toast.error("لطفا همه فیلدها را پر کنید");

      // check video size < 500MB client side too
      if (video.size > 500 * 1024 * 1024) return toast.error("حجم ویدیو بیش از 500MB است");

      toast.loading("در حال آپلود فایل‌ها...");
      const [videoFilename, posterFilename] = await Promise.all([
        uploadFile(video, "/api/videos/upload-file"),
        uploadFile(poster, "/api/videos/upload-poster"),
      ]);

      toast.dismiss();
      toast.loading("در حال ذخیره ویدیو در دیتابیس...");

      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          videoUrl: videoFilename,
          thumbnail: posterFilename,
          status: "approved", // as requested
        }),
      });
      const json = await res.json();
      toast.dismiss();
      if (!res.ok) {
        console.error("create error", json);
        throw new Error(json.error || "Failed to create video");
      }

      setVideos((p) => [json.video, ...p]);
      setNewVideo({ title: "", description: "", video: null, poster: null, category: "" });
      setShowAddModal(false);
      toast.success("ویدیو اضافه شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در افزودن ویدیو");
    }
  };

  // Delete video
  const handleDeleteVideo = async () => {
    if (!videoToDelete) return;
    try {
      const res = await fetch(`/api/videos/${videoToDelete._id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete");
      setVideos((p) => p.filter((v) => v._id !== videoToDelete._id));
      setShowDeleteModal(false);
      toast.success("ویدیو حذف شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در حذف ویدیو");
    }
  };

  // Open edit modal and map fields
  const openEdit = (video) => {
    // copy video to editable state; keep filenames if strings
    setVideoToEdit({
      ...video,
      // video and thumbnail may be filenames (string), allow user to replace with File objects
      video: video.videoUrl || null,
      poster: video.thumbnail || null,
    });
    setShowEditModal(true);
  };

  // Edit video (if user uploaded new files, upload them first)
  const handleEditVideo = async () => {
    try {
      const v = { ...videoToEdit };
      if (!v.title || !v.description || !v.category) return toast.error("فیلدها را کامل کنید");

      let videoFilename = typeof v.video === "string" ? v.video : null;
      let posterFilename = typeof v.poster === "string" ? v.poster : null;

      // If new File objects, upload them
      if (v.video && v.video instanceof File) {
        if (v.video.size > 500 * 1024 * 1024) return toast.error("حجم ویدیو بیش از 500MB است");
        toast.loading("در حال آپلود ویدیو...");
        videoFilename = await uploadFile(v.video, "/api/videos/upload-file");
        toast.dismiss();
      }
      if (v.poster && v.poster instanceof File) {
        if (v.poster.size > 5 * 1024 * 1024) return toast.error("حجم پوستر بیش از 5MB است");
        toast.loading("در حال آپلود پوستر...");
        posterFilename = await uploadFile(v.poster, "/api/videos/upload-poster");
        toast.dismiss();
      }

      toast.loading("در حال ذخیره...");
      const res = await fetch(`/api/videos/${v._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: v.title,
          description: v.description,
          category: v.category,
          videoUrl: videoFilename,
          thumbnail: posterFilename,
        }),
      });
      const json = await res.json();
      toast.dismiss();
      if (!res.ok) throw new Error(json.error || "Failed to update");

      setVideos((p) => p.map((item) => (item._id === json.video._id ? json.video : item)));
      setShowEditModal(false);
      toast.success("ویرایش انجام شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در ویرایش ویدیو");
    }
  };

  // UI rendering
  return (
    <div className="text-gray-200 min-h-screen container">
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-[#49C5B6] hover:bg-[#37a199] text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition shadow-md">
          <FaPlus /> افزودن ویدیو جدید
        </button>
      </div>

         {loadingFetch ? (
          <p className="text-center text-gray-400 text-sm">
            در حال بارگذاری...
          </p>
        ) : videos.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">هیچ ویدیو ای ای یافت نشد</p>
        ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((card) => (
          <article key={card._id} className="bg-black/60 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden flex flex-col h-80">
            <div className="relative w-full h-52">
              <video className="w-full h-52 object-cover" poster={`/api/videos/file/${card.thumbnail}`} controls>
                <source src={`/api/videos/file/${card.videoUrl}`} type="video/mp4" />
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            </div>
            <div className="flex-1 p-4 flex flex-col">
              <h3 className="text-gray-200 font-medium text-sm mb-1">{card.title}</h3>
              <p className="text-gray-400 text-xs font-medium text-justify line-clamp-3 mb-2">{card.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] text-[#49C5B6] font-medium">{card.category}</span>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(card)} className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 transition cursor-pointer"><FaEdit /></button>
                  <button onClick={() => { setVideoToDelete(card); setShowDeleteModal(true); }} className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition cursor-pointer"><FaTrash /></button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
        )}
      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 z-50">
          <div className={`bg-gray-900/95 rounded-xl p-6 w-full max-w-md transform transition-transform duration-300 ${animateAddModal ? "translate-y-0" : "translate-y-4"}`}>
            <h2 className="text-white text-center mb-4"><FaVideo className="text-[#49C5B6] inline mr-2" /> افزودن ویدیو</h2>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="عنوان" value={newVideo.title} onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })} className="w-full p-2 rounded bg-gray-800 text-white" />
              <textarea placeholder="توضیحات" value={newVideo.description} onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })} className="w-full p-2 rounded bg-gray-800 text-white h-24" />
              <div className="flex flex-col">
                <label className="text-xs text-gray-300">ویدیو (mp4)</label>
                <input type="file" accept="video/mp4" onChange={(e) => setNewVideo({ ...newVideo, video: e.target.files[0] })} />
                {newVideo.video && <video src={URL.createObjectURL(newVideo.video)} controls className="mt-2 w-full h-28" />}
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-300">پوستر</label>
                <input type="file" accept="image/*" onChange={(e) => setNewVideo({ ...newVideo, poster: e.target.files[0] })} />
                {newVideo.poster && <img src={URL.createObjectURL(newVideo.poster)} alt="poster" className="mt-2 w-full h-28 object-cover" />}
              </div>
              <div className="flex items-center gap-2">
                <select value={newVideo.category} onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })} className="flex-1 p-2 rounded bg-gray-800 text-white">
                  <option value="">انتخاب دسته‌بندی</option>
                  {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
                <button onClick={() => setShowCategoryModal(true)} className="p-2 bg-[#49C5B6]/30 rounded"><FaFolderPlus /></button>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={handleAddVideo} className="px-3 py-1 text-xs flex items-center justify-center md:text-sm rounded-md  cursor-pointer bg-[#49C5B6] hover:bg-[#37a199] text-white transition">افزودن</button>
              <button onClick={() => setShowAddModal(false)} className="px-3 py-1 text-xs md:text-sm rounded-md  cursor-pointer bg-gray-700 hover:bg-gray-600 text-white transition">بستن</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {showDeleteModal && videoToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-sm text-center">
            <h3 className="text-white mb-3">آیا از حذف این ویدیو مطمئن هستید؟</h3>
            <p className="text-[#49C5B6] mb-4">{videoToDelete.title}</p>
            <div className="flex justify-center gap-3">
              <button onClick={handleDeleteVideo} className="px-3 py-2 text-xs flex items-center justify-center md:text-sm font-medium rounded-md bg-red-600 cursor-pointer hover:bg-red-700 text-white transition">حذف</button>
              <button onClick={() => setShowDeleteModal(false)} className="px-3 py-2 text-xs md:text-sm font-medium rounded-md bg-gray-700 cursor-pointer hover:bg-gray-600 text-white transition">بستن</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {showEditModal && videoToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-y-auto">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-white mb-3">ویرایش ویدیو</h3>
            <div className="flex flex-col gap-3">
              <input type="text" value={videoToEdit.title || ""} onChange={(e) => setVideoToEdit({ ...videoToEdit, title: e.target.value })} className="p-2 rounded bg-gray-800 text-white" />
              <textarea value={videoToEdit.description || ""} onChange={(e) => setVideoToEdit({ ...videoToEdit, description: e.target.value })} className="p-2 rounded bg-gray-800 text-white h-24" />
              <div>
                <label className="text-xs text-gray-300">تعویض ویدیو (اختیاری)</label>
                <input type="file" accept="video/*" onChange={(e) => setVideoToEdit({ ...videoToEdit, video: e.target.files[0] })} />
              </div>
              <div>
                <label className="text-xs text-gray-300">تعویض پوستر (اختیاری)</label>
                <input type="file" accept="image/*" onChange={(e) => setVideoToEdit({ ...videoToEdit, poster: e.target.files[0] })} />
              </div>
              <div className="flex items-center gap-2">
                <select value={videoToEdit.category || ""} onChange={(e) => setVideoToEdit({ ...videoToEdit, category: e.target.value })} className="flex-1 p-2 rounded bg-gray-800 text-white">
                  <option value="">انتخاب دسته‌بندی</option>
                  {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
                <button onClick={() => setShowCategoryModal(true)} className="p-2 bg-[#49C5B6]/30 rounded"><FaFolderPlus /></button>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={handleEditVideo} className="px-3 py-1 text-xs flex items-center justify-center md:text-sm rounded-md  cursor-pointer bg-[#49C5B6] hover:bg-[#37a199] text-white transition">ذخیره</button>
              <button onClick={() => setShowEditModal(false)} className="px-3 py-1 text-xs md:text-sm rounded-md  cursor-pointer bg-gray-700 hover:bg-gray-600 text-white transition">بستن</button>
            </div>
          </div>
        </div>
      )}

      {/* Category modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className={`bg-gray-900 p-6 rounded-xl w-full max-w-xs transform transition-all ${animateCategoryModal ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <h3 className="text-white mb-3 flex items-center gap-2"><FaFolderPlus className="text-[#49C5B6]" /> افزودن دسته‌بندی</h3>
            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white mb-3" />
            <div className="flex justify-end gap-3">
              <button onClick={handleAddCategory} className="px-3 py-1 text-xs flex items-center justify-center md:text-sm rounded-md  cursor-pointer bg-[#49C5B6] hover:bg-[#37a199] text-white transition">افزودن</button>
              <button onClick={() => { setShowCategoryModal(false); setNewCategory(""); }} className="px-3 py-1 text-xs md:text-sm rounded-md  cursor-pointer bg-gray-700 hover:bg-gray-600 text-white transition">لغو</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
