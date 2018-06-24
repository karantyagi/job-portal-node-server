var mongoose =
    require('mongoose');
var jobApplicationSchema =
    require('./job-application.schema.server');
var jobApplicationModel = mongoose
    .model('JobApplicationModel', jobApplicationSchema);


module.exports = {
    findAllJobApplicationByUserId: findAllJobApplicationByUserId,
    createJobApplication: createJobApplication,
    deleteJobApplication: deleteJobApplication,
    updateJobApplication: updateJobApplication,
    deleteJobApplicationForUser:deleteJobApplicationForUser
};

function findJobApplicationByJobId(jobId) {
    return jobApplicationModel.findById(jobId);
}

function findAllJobApplicationByUserId(userId) {
    return jobApplicationModel.find({user:userId});
}

function createJobApplication(jobApplication) {
    return jobApplicationModel.create(jobApplication);
}

function deleteJobApplication(jobApplicationId) {
    return jobApplicationModel.remove({_id: jobApplicationId});
}

function deleteJobApplicationForUser(userId) {
    return jobApplicationModel.remove({user: userId});
}


function updateJobApplication(jobApplicationId, newJobApplication) {
    return jobApplicationModel.update({_id: jobApplicationId},
        {$set: newJobApplication})
}
