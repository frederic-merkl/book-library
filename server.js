import express from "express";
import fetch from "node-fetch";
import cors from "cors"

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

app.get("/api/books", async (request, result) => {
    console.log("Backend:", request.query);
    const params = new URLSearchParams(request.query);
    const url = `https://openlibrary.org/search.json?${params}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        result.json(data);
    } catch (err) {
        result.status(500).json({ error: "Proxy error" });
    }
});

// Server starten
app.listen(PORT, () =>
    console.log(`Server läuft unter http://localhost:${PORT}`)
);
