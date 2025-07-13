import React from "react";
import { X } from "lucide-react";

export default function PlantModal({ plant, onClose }) {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 dark:text-gray-300"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
          {plant.plant_name}
        </h2>

        <p className="text-sm mb-1">
          🌿 <strong>Common Names:</strong>{" "}
          {plant.plant_details?.common_names?.join(", ") || "N/A"}
        </p>
        <p className="text-sm mb-1">
          🔬 <strong>Genus:</strong> {plant.plant_details?.taxonomy?.genus || "N/A"}
        </p>
        <p className="text-sm mb-1">
          📊 <strong>Confidence:</strong> {(plant.probability * 100).toFixed(2)}%
        </p>

        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm italic">
          {plant.plant_details?.wiki_description?.value || "No description available."}
        </p>

        {plant.plant_details?.url && (
          <a
            href={plant.plant_details.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-500 hover:underline font-medium"
          >
            🔗 View full Wikipedia / Plant ID page
          </a>
        )}
      </div>
    </div>
  );
}
