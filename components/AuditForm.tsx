"use client";

import { useState } from "react";

type Props = {
  onResult: (data: any) => void;
};

export default function AuditForm({ onResult }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      onResult(data);
    } catch (err: any) {
      setError(err.message);
      onResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        max-w-full
        rounded-[28px]
        border
        border-violet-500/20
        bg-white/5
        backdrop-blur-2xl
        p-8
        shadow-[0_0_60px_rgba(99,102,241,.08)]
      "
    >
      <div
        className="
          flex items-center gap-3
          rounded-2xl border border-gray-700 bg-[#111827]
          px-5 py-1
          transition
          focus-within:border-violet-500
          focus-within:ring-2
          focus-within:ring-violet-500/20
        "
      >
        <span className="shrink-0 text-2xl text-gray-400">🔗</span>

        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="
            w-full
            bg-transparent
            py-4
            text-lg
            text-white
            placeholder:text-gray-500
            outline-none
          "
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
        mt-6
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-violet-500
        to-blue-500
        py-5
        text-xl
        font-semibold
        text-white
        transition-all
        duration-300
        hover:scale-[1.01]
        hover:shadow-[0_0_30px_rgba(99,102,241,.45)]
        disabled:opacity-50
        "
      >
        {loading ? "Analyzing..." : "Analyze Website"}
      </button>

      {error && (
        <p className="mt-4 text-center text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}