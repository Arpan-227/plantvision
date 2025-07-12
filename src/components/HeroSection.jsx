import React from "react";

export default function HeroSection() {
  const scrollToDetect = () => {
    const el = document.getElementById("detect");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-800 dark:to-gray-900"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-300 mb-4">
        Discover the Name of Any Plant Instantly
      </h2>
      <p className="max-w-xl text-gray-700 dark:text-gray-300 text-lg mb-8">
        Upload a photo of any plant and let our intelligent recognition system find its species, genus, and more!
      </p>
      <button
        onClick={scrollToDetect}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg rounded-full font-semibold transition duration-300 shadow-md"
      >
        🌿 Start Detection
      </button>
    </section>
  );
}
