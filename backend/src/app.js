require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const express = require('express');

const app = express();

module.exports = app;