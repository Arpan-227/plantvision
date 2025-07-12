const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 5000;

// ✅ Your correct Plant.id FREE API key
const API_KEY = "dSuQA3bSsMXBfOatwvxsDSnCFJNf7ii0x2UxlC55J3HFkJagkP";

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/api/detect", async (req, res) => {
  console.log("📥 Incoming request at /api/detect");

  try {
    const response = await fetch("https://api.plant.id/v2/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": API_KEY
      },
      body: JSON.stringify({
        images: req.body.images,
        plant_language: "en",
        plant_details: ["common_names", "url", "name_authority", "wiki_description", "taxonomy"]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Plant.id API Error:", data);
      return res.status(500).json({ error: "Plant.id API error", details: data });
    }

    console.log("✅ Plant ID success");
    res.json(data);
  } catch (err) {
    console.error("🔥 Backend crash:", err);
    res.status(500).json({ error: "Backend error", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🌱 Plant API proxy is running at http://localhost:${PORT}`);
});
