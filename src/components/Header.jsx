import React from "react";
import { Globe } from "lucide-react";

export default function Header({ lang, setLang }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-green-100 dark:bg-gray-800 shadow">
      <h1 className="text-xl font-bold text-green-700 dark:text-green-300">PlantVision</h1>
      <div className="flex items-center gap-4">
        {/* 🌐 Language Toggle */}
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="hover:text-green-600 transition"
          title="Switch Language"
        >
          <Globe />
        </button>
      </div>
    </header>
  );
}
