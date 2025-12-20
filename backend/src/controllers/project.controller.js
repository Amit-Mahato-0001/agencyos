const projectService = require("../services/project.service");

const createProject = async (req, res) => {

    try{
        const { name, description } = req.body;

        const project = await projectService.createProject({
            name,
            description,
            tenantId: req.tenantId,
            members: [req.user.userId]
        })

        res.status(201).json(project);
    } catch (err){
        console.error(err)
        res.status(500).json({ message: "Project creation failed" });
    }
};

const getProjects = async (req, res) => {

    try{
        const projects = await projectService.getProjectsByTenant(req.tenantId)
        res.json(projects)
    } catch(err){
        res.status(500).json({ message: "Failed to fetch projects" })
    }
};

const deleteProject = async (req, res) => {

    try{
        const { projectId } = req.params

        await projectService.deleteProject(projectId, req.tenantId)
        res.json({ message: "Project deleted" })

    } catch {
        res.status(500).json({ message: "Delete failed" })
    }
};

module.exports = {
    createProject,
    getProjects,
    deleteProject
}