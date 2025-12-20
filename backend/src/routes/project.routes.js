const express = require("express");
const router = express.Router();

const requireRole = require("../middlewares/rbac.middleware");
const projectController = require("../controllers/project.controller");

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
    projectController.deleteProject
)

module.exports = router;

