// src/components/HeroSection.jsx
import React from "react";

export default function HeroSection({ lang }) {
  const t = {
    en: { title: "Plant Identification Made Easy",
          subtitle: "Upload a photo and get detailed plant info instantly.",
          btn: "🌿 Start Detecting" },
    hi: { title: "पौधों की पहचान अब आसान",
          subtitle: "फोटो अपलोड करें और तुरंत जानकारी पाएं।",
          btn: "🌿 पहचान शुरू करें" },
    bn: { title: "গাছ সনাক্তকরণ সহজ",
          subtitle: "একটি ছবি আপলোড করুন এবং বিস্তারিত তথ্য পান।",
          btn: "🌿 সনাক্তকরণ শুরু করুন" }
  }[lang];

  return (
    <section id="home" className="text-center py-20 bg-green-200 dark:bg-gray-800">
      <h2 className="text-4xl font-bold mb-4 text-green-800 dark:text-green-300">{t.title}</h2>
      <p  className="mb-6 text-gray-700 dark:text-gray-300">{t.subtitle}</p>

      <button
        onClick={() => document.getElementById("detect")?.scrollIntoView({ behavior: "smooth" })}
        className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition"
      >
        {t.btn}
      </button>
    </section>
  );
}
