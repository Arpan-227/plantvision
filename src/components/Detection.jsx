import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import Fuse from "fuse.js";
import PlantModal from "./PlantModal";

export default function Detection({ lang = "en" }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);

  const t = {
    title: "Upload a Plant Image",
    subtitle: "Drag and drop or upload a plant photo to identify its species.",
    uploadPlaceholder: "🌿 Drag & drop image here or click to upload",
    analyze: "Analyze Plant",
    reset: "Reset",
    error: "Please upload a valid image file.",
    search: "Search plant name or genus...",
    common: "Common Names",
    genus: "Genus",
    confidence: "Confidence",
    more: "View more →"
  };

  const handleImageUpload = (e) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setError("");
    } else {
      setError(t.error);
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

  const analyzeImage = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const base64 = await getBase64(file);
      const res = await fetch("https://plantvision-backend.onrender.com/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: [base64] })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "API request failed.");
      setResult(data);
    } catch (err) {
      console.error("Detection failed:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError("");
    setSearch("");
    setSelectedPlant(null);
  };

  const suggestions = result?.suggestions || [];

  const fuse = new Fuse(suggestions, {
    keys: [
      "plant_name",
      "plant_details.common_names",
      "plant_details.taxonomy.genus",
      "plant_details.scientific_name"
    ],
    threshold: 0.3
  });

  const filteredResults =
    search.trim() === ""
      ? suggestions
      : fuse.search(search.trim()).map((r) => r.item);

  return (
    <section id="detect" className="py-20 bg-green-50 dark:bg-gray-900 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-700 dark:text-green-400">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t.subtitle}</p>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) {
              handleImageUpload({ target: { files: e.dataTransfer.files } });
            }
          }}
          className="border-4 border-dashed rounded-xl p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition"
        >
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="upload" />
          <label htmlFor="upload" className="block cursor-pointer">
            {preview ? (
              <img src={preview} alt="Preview" className="mx-auto max-h-64 object-contain rounded shadow-md" />
            ) : (
              <p className="text-lg">{t.uploadPlaceholder}</p>
            )}
          </label>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={analyzeImage}
            disabled={!file || loading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={18} />} {t.analyze}
          </button>

          <button
            onClick={reset}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold rounded-full transition flex items-center gap-2"
          >
            <Trash2 size={18} /> {t.reset}
          </button>
        </div>

        {error && <p className="mt-4 text-red-600 dark:text-red-400 font-medium">⚠️ {error}</p>}

        {filteredResults.length > 0 && (
          <div className="mt-10">
            <input
              type="text"
              placeholder={t.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-6 px-4 py-2 rounded-lg w-full max-w-md mx-auto text-black dark:text-white bg-gray-100 dark:bg-gray-800 border dark:border-gray-700"
            />
            <div className="grid md:grid-cols-3 gap-6">
              {filteredResults.slice(0, 3).map((plant, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
                >
                  <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-1">{plant.plant_name}</h3>
                  <p className="text-sm mb-1">🌿 {t.common}: {plant.plant_details?.common_names?.join(", ") || "N/A"}</p>
                  <p className="text-sm mb-1">🔬 {t.genus}: {plant.plant_details?.taxonomy?.genus || "N/A"}</p>
                  <p className="text-sm mb-1">📊 {t.confidence}: {(plant.probability * 100).toFixed(2)}%</p>
                  <p className="text-sm mt-2 italic text-gray-600 dark:text-gray-400">
                    {plant.plant_details?.wiki_description?.value?.slice(0, 100) || "No description available."}
                  </p>
                  <button
                    onClick={() => setSelectedPlant(plant)}
                    className="text-sm text-blue-500 underline mt-2 inline-block hover:text-blue-700"
                  >
                    {t.more}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal for plant details */}
      <PlantModal plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
    </section>
  );
}
