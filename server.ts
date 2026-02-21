import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("bookings.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    shoot_type TEXT NOT NULL,
    preferred_date TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, shoot_type, preferred_date, message } = req.body;
    
    try {
      const stmt = db.prepare(`
        INSERT INTO submissions (name, email, phone, shoot_type, preferred_date, message)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      stmt.run(name, email, phone, shoot_type, preferred_date, message);
      
      res.status(200).json({ success: true, message: "Bedankt! We nemen zo snel mogelijk contact met je op." });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, message: "Er is iets misgegaan. Probeer het later opnieuw." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
