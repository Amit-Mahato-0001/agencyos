const Project = require("../models/project.model");
const User = require("../models/user.model");
const auditLog = require("../models/audit.model");

const getDashboardStats = async (req, res) => {
    try {

        const tenantId = req.tenantId;

        const totalProjects = await Project.countDocuments({
            tenantId,
            deleteAt: null
        });

        const activeProjects = await Project.countDocuments({
            tenantId,
            status: "active",
            deleteAt: null
        });

        const totalUsers = await User.countDocuments({
            tenantId,
            role: { $ne: "client" }
        });

        const totalClients = await Project.countDocuments({
            tenantId,
            role: "client"
        });

        const recentActivity = await auditLog.find({ tenantId })
        .sort({ createdAt: -1 })
        .limit(5)

        res.json({
            totalProjects,
            activeProjects,
            totalUsers,
            totalClients,
            recentActivity
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Dashboard fetch failed" });
    }
};

module.exports = { getDashboardStats };