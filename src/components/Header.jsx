import React from "react";
import { Sun, Moon } from "lucide-react";

export default function Header({ toggleTheme, darkMode, lang, setLang }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md sticky top-0 z-50 bg-white dark:bg-gray-900 transition-colors">
      <h1
        className="text-2xl font-bold cursor-pointer text-green-700 dark:text-green-400"
        onClick={() => scrollTo("hero")}
      >
        🌿 PlantVision
      </h1>
      <nav className="flex gap-6 items-center">
        <button onClick={() => scrollTo("hero")} className="text-sm font-medium hover:text-green-600 dark:hover:text-green-300">Home</button>
        <button onClick={() => scrollTo("detect")} className="text-sm font-medium hover:text-green-600 dark:hover:text-green-300">Detect</button>
        <button onClick={() => scrollTo("about")} className="text-sm font-medium hover:text-green-600 dark:hover:text-green-300">About</button>

        {/* Language Toggle */}
        <div className="flex gap-1 border rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 text-xs">
          <button
            className={`px-2 py-1 ${lang === "en" ? "bg-green-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            className={`px-2 py-1 ${lang === "hi" ? "bg-green-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-600"}`}
            onClick={() => setLang("hi")}
          >
            हिंदी
          </button>
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="text-xl p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>
    </header>
  );
}
