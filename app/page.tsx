"use client";

import { useState } from "react";
import AuditForm from "@/components/AuditForm";
import AuditResult from "@/components/AuditResult";

export default function Home() {
  const [result, setResult] = useState<any>(null);

  return (
    <main
      className={`
        min-h-screen
        px-6
        flex
        flex-col
        items-center
        transition-all
        duration-300
        ${result ? "justify-start pt-16 pb-16" : "justify-center"}
      `}
    >
      <div className="mx-auto w-full max-w-[760px]">

        {/* Hero */}
        <div className="mb-10 flex flex-col items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_35px_rgba(99,102,241,.35)]">
              <span className="text-2xl">⚡</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
              Page{" "}
              <span className="bg-gradient-to-r from-violet-300 to-blue-400 bg-clip-text text-transparent">
                Pulse
              </span>
            </h1>
          </div>

          <p className="mt-4 text-lg text-center text-gray-400">
            Audit any website instantly.
          </p>
        </div>

        {/* Form */}
        <div className="w-full">
          <AuditForm onResult={setResult} />
        </div>

        {/* Results */}
        {result && (
          <div
            className="
              mt-8
              w-full
              animate-in
              fade-in
              duration-300
            "
          >
            <AuditResult result={result} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          Built for{" "}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
            className="text-violet-400 transition hover:text-violet-300"
          >
            Digital Heroes Training Task
          </a>
        </footer>

      </div>
    </main>
  );
}