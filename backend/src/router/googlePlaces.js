// backend/src/router/googlePlaces.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  const radius = 2000;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    console.log("Respuesta de Google:", response.data); // <-- muy importante

    return res.json(response.data.results);
  } catch (error) {
    console.error("Google Places API Error:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch nearby restaurants" });
  }
});

module.exports = router;
