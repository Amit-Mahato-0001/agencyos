const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/rbac.middleware");
const { createClient } = require("../controllers/user.controller");
const auditLogger = require("../middlewares/audit.middleware");

router.post(
    "/clients",
    requireRole(["owner", "admin"]),
    createClient
);

router.post(
    "/clients",
    requireRole(["owner", "admin"]),
    auditLogger("CLIENT_CREATED"),
    createClient
)

module.exports = router;