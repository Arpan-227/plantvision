import React from "react";

export default function PlantModal({ plant, onClose }) {
  if (!plant) return null;

  const wikiUrl =
    plant.plant_details?.url ||
    `https://en.wikipedia.org/wiki/${encodeURIComponent(plant.plant_name)}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-xl w-full shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-2xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-3">
          {plant.plant_name}
        </h2>
        <p className="mb-2">🌿 <strong>Common Names:</strong> {plant.plant_details?.common_names?.join(", ") || "N/A"}</p>
        <p className="mb-2">🔬 <strong>Genus:</strong> {plant.plant_details?.taxonomy?.genus || "N/A"}</p>
        <p className="mb-2">📊 <strong>Confidence:</strong> {(plant.probability * 100).toFixed(2)}%</p>
        <p className="mb-4 italic text-gray-700 dark:text-gray-400">
          {plant.plant_details?.wiki_description?.value || "No detailed description available."}
        </p>
        <a
          href={wikiUrl}
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 Read more on Wikipedia →
        </a>
      </div>
    </div>
  );
}
