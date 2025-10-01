"use client";
import { useState } from "react";

export default function TestApi() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTestApi = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/test", { method: "POST" });
      const data = await res.json();
      setResponse(data.message); // نمایش "سلام"
    } catch (err) {
      console.error("خطا در ارتباط با API", err);
      setResponse("خطا در ارتباط با API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-sm mx-auto mt-8">
      <button
        onClick={handleTestApi}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "در حال ارسال..." : "تست API"}
      </button>

      {response && (
        <p className="mt-4 text-center text-green-500 font-medium">{response}</p>
      )}
    </div>
  );
}
