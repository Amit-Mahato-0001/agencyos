require("dotenv").config();
const connectDB = require("./config/db");
const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/auth.routes");
const authenticate = require("./middlewares/auth.middleware");
const resolveTenant = require("./middlewares/tenant.middleware");
const requireRole = require("./middlewares/rbac.middleware");
const projectRoutes = require("./routes/project.routes");
const userRoutes = require("./routes/user.routes");

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

app.get("/api/owner-only", requireRole(["owner"]), (req, res) => {
    res.json({ message: "Welcome owner" })
})

app.get("/api/admin-only", requireRole(["owner","admin"]), (req, res) => {
    res.json({ message: "Welcome Admin or Owner" })
})

app.get("/api/member-only", requireRole(["owner","admin","member"]), (req,res) => {
    res.json({ message: "Welcome team member"})
})

app.use("/api/projects", projectRoutes)

app.use("/api/users", userRoutes)

module.exports = app;