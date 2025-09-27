"use client";

import { useState } from "react";
import cards from "@/data/datas"; 


export default function MyComments() {
  const [statusFilter, setStatusFilter] = useState("all"); // all | approved | rejected | pending

  // همه کامنت‌ها با اطلاعات کارت
  const allComments = cards.flatMap((card) =>
    card.comments.map((comment) => ({
      ...comment,
      cardId: card.id,
      cardTitle: card.title,
      cardLink: card.link,
    }))
  );

  // فیلتر کردن بر اساس وضعیت
  const filteredComments = allComments.filter((c) =>
    statusFilter === "all" ? true : c.status === statusFilter
  );

  // رنگ بوردر بر اساس وضعیت
  const borderColor = (status) => {
    switch (status) {
      case "approved":
        return "border-emerald-500";
      case "rejected":
        return "border-red-500";
      case "pending":
        return "border-yellow-400";
      default:
        return "border-gray-500";
    }
  };

  return (
    <div className=" container">
      <h1 className="text-xl font-bold text-white mb-4">کامنت‌های من</h1>

      {/* فیلتر وضعیت */}
      <div className="flex gap-2 mb-6">
        {["all", "approved", "pending" ,"rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded text-xs cursor-pointer ${
              statusFilter === status
                ? "bg-[#49C5B6] text-white"
                : "bg-gray-700 text-gray-200"
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
        {filteredComments.length === 0 && (
          <p className="text-gray-300 text-sm">کامنتی برای نمایش وجود ندارد.</p>
        )}

        {filteredComments.map((comment) => (
          <div
            key={`${comment.cardId}-${comment.id}`} // ← کلید منحصر به فرد
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
              <a href={comment.cardLink} className="text-[#49C5B6]">
                {comment.cardTitle}
              </a>{" "}
              - تاریخ: {comment.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
