const express = require("express");
const router = express.Router();

const requireRole = require("../middlewares/rbac.middleware");
const projectController = require("../controllers/project.controller");
const auditLogger = require("../middlewares/audit.middleware");

router.post(
    "/",
    requireRole(["owner", "admin", "member"]),
    projectController.createProject
)

router.get(
    "/",
    requireRole(["owner", "admin", "member", "client"]),
    projectController.getProjects
)

router.delete(
    "/:projectId",
    requireRole(["owner", "admin"]),
    auditLogger("PROJECT_DELETED"),
    projectController.deleteProject
)

router.patch(
    "/:projectId/assign-client",
    requireRole(["owner", "admin"]),
    projectController.assignClient
)

router.post(
    "/",
    requireRole(["owner", "admin", "member"]),
    auditLogger("PROJECT_CREATED"),
    projectController.createProject
)

module.exports = router;

