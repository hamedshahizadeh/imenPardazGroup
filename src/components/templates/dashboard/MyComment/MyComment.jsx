"use client";

import { useState, useEffect } from "react";
import { useUser } from "../../../../../context/UserContext";

export default function MyComments() {
  const user = useUser(); // user فعلی
  const userId = user?._id;

  const [statusFilter, setStatusFilter] = useState("all");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/comments/myComments?userId=${userId}`);
        const data = await res.json();
        if (res.ok) setComments(data.comments || []);
        else setComments([]);
      } catch (err) {
        console.error(err);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [userId]);

  const filteredComments = comments.filter((c) =>
    statusFilter === "all" ? true : c.status === statusFilter
  );

  const borderColor = (status) => {
    switch (status) {
      case "approved": return "border-emerald-500";
      case "rejected": return "border-red-500";
      case "pending": return "border-yellow-400";
      default: return "border-gray-500";
    }
  };

  return (
    <div className="container">
      <h1 className="text-xl font-bold text-white mb-4">کامنت‌های من</h1>

      {/* فیلتر وضعیت */}
      <div className="flex gap-2 mb-6">
        {["all", "approved", "pending", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded text-xs cursor-pointer ${
              statusFilter === status ? "bg-[#49C5B6] text-white" : "bg-gray-700 text-gray-200"
            }`}
          >
            {status === "all"
              ? "همه"
              : status === "approved"
              ? "تایید شده"
              : status === "rejected"
              ? "رد شده"
              : "در انتظار"}
          </button>
        ))}
      </div>

      {/* لیست کامنت‌ها */}
      <div className="space-y-2">
        {loading &&         <p className="text-center text-gray-400 text-sm">در حال بارگذاری...</p>}
        {!loading && filteredComments.length === 0 && (
                <p className="text-center text-gray-400 text-sm">هیچ نظری یافت نشد</p>

        )}

        {!loading &&
          filteredComments.map((comment) => (
            <div
              key={`${comment.blogId}-${comment.id}`}
              className={`border-l-4 ${borderColor(comment.status)} bg-gray-900/60 p-4 rounded-xl shadow`}
            >
              <p className="text-gray-200 text-sm mb-1">{comment.text}</p>
              {comment.status === "rejected" && comment.adminMessage && (
                <p className="text-red-400 text-xs mb-1">
                  دلیل رد شدن: {comment.adminMessage}
                </p>
              )}
              <p className="text-gray-400 text-xs">
                مربوط به پست:{" "}
                <a href={comment.blogLink} className="text-[#49C5B6]">
                  {comment.blogTitle}
                </a>{" "}
                - تاریخ: {comment.date ? new Date(comment.date).toLocaleDateString("fa-IR") : "-"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
