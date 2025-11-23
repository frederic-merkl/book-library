import express from "express";
import fetch from "node-fetch";
import cors from "cors"

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5500' // wie dynamisch setzen?
}));

app.get("/api/books", async (request, result) => {
    const URLparam = new URLSearchParams(request.query);
    const queryString = String(URLparam);
    const limit = 1;
    const url = `https://openlibrary.org/search.json?${queryString}&limit=${limit}`;
    console.log(url);
    try {
        const response = await fetch(url); 
        const data = await response.json(); // json() from fetch api ==> read operation
        result.json(data); // express json() => parse to json, set headers and send to browser (json) ==> write operation
    } catch (error) {
        reponse.status(500).json({ error: "Sever error" });
    }
});

// Server starten
app.listen(PORT, () =>
    console.log(`Server läuft unter http://localhost:${PORT}`)
);
