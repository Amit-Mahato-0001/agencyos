const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/rbac.middleware");
const { createClient } = require("../controllers/user.controller");

router.post(
    "/clients",
    requireRole(["owner", "admin"]),
    createClient
);

module.exports = router;