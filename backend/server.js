import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = process.env.API_KEY;

// ✅ CORS config — FIX
app.use(cors({
  origin: "*",
  methods: ["POST"]
}));

app.use(bodyParser.json({ limit: "10mb" }));

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

app.listen(PORT, () => {
  console.log(`🌱 Plant API proxy is running at http://localhost:${PORT}`);
});
