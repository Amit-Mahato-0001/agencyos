require("dotenv").config();
const connectDB = require("./config/db");
const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/auth.routes");
const authenticate = require("./middlewares/auth.middleware");
const resolveTenant = require("./middlewares/tenant.middleware");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(authenticate);
app.use(resolveTenant);

app.get("/api/me", (req,res) => {
    res.json({
        user: req.user,
        tenant: {
            id: req.tenant._id,
            name: req.tenant.name,
            plan: req.tenant.plan
        }
    })
})

module.exports = app;