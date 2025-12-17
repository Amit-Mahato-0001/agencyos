require("dotenv").config();
const connectDB = require("./config/db");
const express = require('express');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/health", (req,res) => {
    res.json({ status: "OK" });
})

module.exports = app;