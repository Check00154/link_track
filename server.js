const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/receive', (req, res) => {
    const { latitude, longitude } = req.body;
    const time = new Date().toLocaleString();
    const entry = `Time: ${time}, Latitude: ${latitude}, Longitude: ${longitude}\n`;

    fs.appendFile('locations.txt', entry, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Failed to save location.");
        }
        console.log("Location saved:", entry);
        res.send("✅ Location captured successfully!");
    });
});

app.get("/", (req, res) => {
    res.send("Location Tracker Server is Running.");
});

app.listen(port, () => console.log(`✨ Server running on port ${port}`));
