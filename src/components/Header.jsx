// src/components/Header.jsx
import React from "react";

export default function Header({ lang, setLang }) {
  const labels = {
    en: { home: "Home", about: "About", detect: "Detect", contact: "Contact" },
    hi: { home: "होम", about: "परिचय", detect: "पता लगाएँ", contact: "संपर्क" },
    bn: { home: "হোম", about: "পরিচিতি", detect: "সনাক্ত", contact: "যোগাযোগ" }
  }[lang];

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-green-100 dark:bg-gray-800 shadow">
      <h1 onClick={() => scrollTo("home")}
          className="text-xl font-bold text-green-700 dark:text-green-300 cursor-pointer">
        PlantVision
      </h1>

      <nav className="flex items-center gap-6">
        <button onClick={() => scrollTo("home")   }>{labels.home}</button>
        <button onClick={() => scrollTo("about")  }>{labels.about}</button>
        <button onClick={() => scrollTo("detect") }>{labels.detect}</button>
        <button onClick={() => scrollTo("footer") }>{labels.contact}</button>

        {/* language drop‑down */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="ml-4 px-2 py-1 rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="bn">বাংলা</option>
        </select>
      </nav>
    </header>
  );
}
