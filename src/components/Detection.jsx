import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import Fuse from "fuse.js";

export default function Detection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const handleImageUpload = (e) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setError("");
    } else {
      setError("Please upload a valid image file.");
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
  };

  const suggestions = result?.suggestions || [];

  const fuse = new Fuse(suggestions, {
    keys: [
      "plant_name",
      "plant_details.common_names",
      "plant_details.taxonomy.genus"
    ],
    threshold: 0.3
  });

  const filteredResults =
    search.trim() === ""
      ? suggestions
      : fuse.search(search.trim()).map((r) => r.item);

  return (
    <section className="py-20 bg-green-50 dark:bg-gray-900 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-700 dark:text-green-400">Upload a Plant Image</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Drag and drop or upload a plant photo to identify its species.
        </p>

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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="upload"
          />
          <label htmlFor="upload" className="block cursor-pointer">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-64 object-contain rounded shadow-md"
              />
            ) : (
              <p className="text-lg">🌿 Drag & drop image here or click to upload</p>
            )}
          </label>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={analyzeImage}
            disabled={!file || loading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={18} />} Analyze Plant
          </button>

          <button
            onClick={reset}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold rounded-full transition flex items-center gap-2"
          >
            <Trash2 size={18} /> Reset
          </button>
        </div>

        {error && <p className="mt-4 text-red-600 dark:text-red-400 font-medium">⚠️ {error}</p>}

        {filteredResults.length > 0 && (
          <div className="mt-10">
            <input
              type="text"
              placeholder="Search plant name or genus…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-6 px-4 py-2 rounded-lg w-full max-w-md mx-auto text-black dark:text-white bg-gray-100 dark:bg-gray-800 border dark:border-gray-700"
            />

            <div className="grid md:grid-cols-3 gap-6">
              {filteredResults.slice(0, 3).map((plant, index) => {
                const name = plant.plant_name;
                const common = plant.plant_details?.common_names?.join(", ") || "N/A";
                const genus = plant.plant_details?.taxonomy?.genus || "N/A";
                const confidence = (plant.probability * 100).toFixed(2);
                const description = plant.plant_details?.wiki_description?.value || "No description available.";
                const wikiUrl =
                  plant.plant_details?.url ||
                  `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`;

                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
                  >
                    <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-1">{name}</h3>
                    <p className="text-sm mb-1">🌿 Common Names: {common}</p>
                    <p className="text-sm mb-1">🔬 Genus: {genus}</p>
                    <p className="text-sm mb-1">📊 Confidence: {confidence}%</p>
                    <p className="text-sm mt-2 italic text-gray-600 dark:text-gray-400">{description}</p>
                    <a
                      href={wikiUrl}
                      className="text-sm text-blue-500 underline mt-2 inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🔍 View more →
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
