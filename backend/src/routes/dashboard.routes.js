const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboard.controller");
const requireRole = require("../middlewares/rbac.middleware");

router.get(
    "/",
    requireRole(["owner", "admin"]),
    getDashboardStats
)

module.exports = router;