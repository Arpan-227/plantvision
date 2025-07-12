import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv"; // ✅ load .env file

dotenv.config(); // ✅ activate .env

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ use key from .env
const apiKey = process.env.API_KEY;


app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// 🔍 Main route to handle image detection
app.post("/api/detect", async (req, res) => {
  console.log("📥 Incoming request at /api/detect");

  const { images } = req.body;

  try {
    const response = await fetch("https://api.plant.id/v2/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
      },
      body: JSON.stringify({
        images,
        similar_images: true,
        disease_details: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("❌ Plant.id API Error:", err);
      return res.status(500).json({ error: "Plant.id API request failed" });
    }

    const data = await response.json();
    console.log("✅ Detection success");
    res.json(data);
  } catch (err) {
    console.error("❌ Request failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🌱 Plant API proxy is running at http://localhost:${PORT}`);
});
