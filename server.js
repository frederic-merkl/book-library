import express from "express";
import fetch from "node-fetch";
import cors from "cors"

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500' // wie dynamisch setzen?
}));
app.use(express.json());


app.post("/api/books", async (request, result) => {
    const dataObj = request.body;
    // In order to avoid emtpy query parameters I have to filter the object.
    // Makes array [[key, value]] => data[1] == value
    const filteredData = Object.entries(dataObj).filter((data) => {
        if (data[0] === "category") { return false } // category will not be included in search parameters
        return data[1].trim() !== "";
    })

    const URLparam = new URLSearchParams(filteredData);
    const queryString = String(URLparam);
    const limit = 1;
    const requestURL = `https://openlibrary.org/search.json?${queryString}&limit=${limit}`;
    console.log(requestURL);
    try {
        const response = await fetch(requestURL);
        if (!response.ok) { throw new Error("OL fetch error") }
        const data = await response.json(); // json() from fetch api ==> read operation
        result.json(data); // express json() => parse to json, set headers and send to browser (json) ==> write operation
    } catch (error) {
        reponse.status(500).json({ error: "Sever error" });
    }
});

app.get("/api/cover", async (request, result) => {
    const value = "OLID" // value of the chosen key
    const key = request.query; // object with the query parameter
    const size = "L";
    const requestURL = `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;

    try {
        const response = await fetch(requestURL);
        if (!response.ok) { throw new Error("OL fetch error") };
        const imageData = await response.arrayBuffer();
        result.json(imageData);
    } catch (error) {
        reponse.status(500).json({ error: "Sever error" });
    }
})


// Server starten
app.listen(PORT, () =>
    console.log(`Server läuft unter http://localhost:${PORT}`)
);
