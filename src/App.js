import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import Detection from "./components/Detection";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
      <Header
        toggleTheme={() => setDarkMode(!darkMode)}
        darkMode={darkMode}
        lang={lang}
        setLang={setLang}
      />
      <HeroSection lang={lang} />
      <AboutSection lang={lang} />
      <Detection lang={lang} />
      <Footer />
    </div>
  );
}

export default App;
