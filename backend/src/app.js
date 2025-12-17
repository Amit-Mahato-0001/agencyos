require("dotenv").config();
const connectDB = require("./config/db");
const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/auth.routes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/health", (req,res) => {
    res.json({ status: "OK" });
})

app.use("/api/auth", authRoutes);

module.exports = app;