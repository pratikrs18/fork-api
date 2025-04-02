require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json()); // Middleware for parsing JSON

const GOOGLE_SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK; // Web App URL from Apps Script

app.post("/schedule-demo", async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: "Name and Email are required." });
        }

        // Send data to Google Apps Script Webhook
        const response = await axios.post(GOOGLE_SHEET_WEBHOOK, { name, email });

        if (response.data.status === "Success") {
            return res.status(200).json({ message: "Data saved successfully in Google Sheets." });
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});
