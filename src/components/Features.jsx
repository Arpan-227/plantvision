import React from "react";

const features = [
  {
    icon: "🌿",
    title: "Plant Identification",
    description: "Upload a plant image and instantly identify the species."
  },
  {
    icon: "🧫",
    title: "Disease Detection",
    description: "Get detailed disease analysis and diagnosis using AI."
  },
  {
    icon: "💧",
    title: "Smart Care Tips",
    description: "Receive personalized care advice based on your plant's condition."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-all">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
