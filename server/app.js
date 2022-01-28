const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv/config');

// Middleware

// Enable cross Origin requests 
app.use(cors());

// Enables us to read json frmat responses
app.use(express.json());

// Import Routes
const authRoute = require('./routes/auth');

// Route Middlewares
app.use('/api/user', authRoute);
// Server Port
const PORT = 3001

// Main Route
app.get("/", (req, res) => {
    res.send("Web Application Server!")
});

// CONNECT TO DATABASE
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("DB Connected!");
});

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});