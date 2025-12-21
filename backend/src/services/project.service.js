const Project = require("../models/project.model");

const createProject = async (data) => {

    return Project.create(data);

};

const getProjectsByTenant = async (tenantId) => {

    return Project.find({
        tenantId,
        deletedAt: null
    })
};

const deleteProject = async (projectId, tenantId) => {
    
    return Project.findOneAndUpdate(
        { _id: projectId, tenantId },
        { deletedAt: new Date() },
        { new: true }
    )
};

const assignClientToProject = async (projectId, clientId, tenantId) => {

    return Project.findOneAndUpdate(
        { _id: projectId, tenantId },
        { clientId },
        { new: true }
    )
};

module.exports = {
    createProject,
    getProjectsByTenant,
    deleteProject,
    assignClientToProject
}

