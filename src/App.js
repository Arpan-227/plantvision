// src/App.js
import React, { useState } from "react";
import Header        from "./components/Header";
import HeroSection   from "./components/HeroSection";
import AboutSection  from "./components/AboutSection";
import Detection     from "./components/Detection";
import Footer        from "./components/Footer";

export default function App() {
  const [lang, setLang] = useState("en");   //  🌐  "en" | "hi" | "bn"

  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-black dark:text-white">
      <Header        lang={lang} setLang={setLang} />
      <HeroSection   lang={lang} />
      <AboutSection  lang={lang} />
      <Detection     lang={lang} />
      <Footer        lang={lang} />
    </div>
  );
}
