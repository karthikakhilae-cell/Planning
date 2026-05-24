import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export function createExpressApp() {
  const app = express();
  const router = express.Router();

  app.use(express.json());
  app.use(cors());

  // API Route for Inquiry Form (Proxy to Google Apps Script)
  router.post("/inquiry", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!scriptUrl) {
      return res.status(500).json({ error: "Google Apps Script URL is not configured" });
    }

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      if (response.ok) {
        res.status(200).json({ success: true, message: "Inquiry submitted successfully!" });
      } else {
        const errorText = await response.text();
        console.error("Apps Script Error:", errorText);
        res.status(500).json({ error: "Failed to submit to Apps Script" });
      }
    } catch (error) {
      console.error("Error submitting to Google Apps Script:", error);
      res.status(500).json({ error: "Failed to submit inquiry. Please try again later." });
    }
  });

  // API Route to fetch data from Google Sheets (via Apps Script)
  router.get("/data", async (req, res) => {
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!scriptUrl) {
      return res.status(500).json({ error: "Google Apps Script URL is not configured" });
    }

    try {
      const response = await fetch(`${scriptUrl}?action=getData`);

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        const errorText = await response.text();
        console.error("Apps Script Fetch Error:", errorText);
        res.status(500).json({ error: "Failed to fetch data from Apps Script" });
      }
    } catch (error) {
      console.error("Error fetching from Google Apps Script:", error);
      res.status(500).json({ error: "Failed to fetch data. Please try again later." });
    }
  });

  // API Route for Projects (Static for now, can be expanded to GitHub API)
  router.get("/projects", async (req, res) => {
    // For now, we return an empty array or you could return static projects.
    // The frontend merges this with STATIC_PROJECTS from constants.
    res.status(200).json([]);
  });

  // Mount the router at both paths to support local dev and Netlify functions
  app.use("/api", router);
  app.use("/.netlify/functions/api", router);

  return app;
}
