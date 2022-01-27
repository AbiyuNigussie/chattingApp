const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv');

// SERVER PORT
const PORT = 3001

// MAIN ROUTE
app.get("/", (req, res) => {
    res.send("Web Application Server!")
});

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});