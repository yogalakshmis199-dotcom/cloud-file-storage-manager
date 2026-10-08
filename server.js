const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// Home route
app.get("/", (req, res) => {

    res.json({
        message: "Cloud File Storage API is running!"
    });

});


// Get files
app.get("/files", (req, res) => {

    res.json({
        message: "File list API is working.",
        files: []
    });

});


// Upload file
app.post("/upload", (req, res) => {

    res.json({
        message: "File upload API is ready."
    });

});


// Delete file
app.delete("/files/:id", (req, res) => {

    const id = req.params.id;

    res.json({
        message: `File ${id} deleted successfully.`
    });

});


app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});