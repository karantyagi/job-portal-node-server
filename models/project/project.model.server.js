var mongoose =
    require('mongoose');
var projectSchema =
    require('./project.schema.server');
var projectModel = mongoose
    .model('ProjectModel', projectSchema);

module.exports = {
    findAllProjects: findAllProjects,
    findProjectByUserId: findProjectByUserId,
    createProject: createProject,
    deleteProject: deleteProject,
    updateProject: updateProject
};


function findAllProjects() {
    // console.log('pass 1');
    return projectModel.find();
}

function findProjectByUserId(userId) {
    return projectModel.find({user: userId});
}

function createProject(project) {
    console.log(project);
    return projectModel.create(project);
}

function deleteProject(projectId) {
    return projectModel.remove({_id: projectId});
}

function updateProject(projectId, newProject) {
    return projectModel.update({_id: projectId},
        {$set: newProject})
}




