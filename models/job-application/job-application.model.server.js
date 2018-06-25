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
    deleteJobApplicationForJobPosting: deleteJobApplicationForJobPosting,
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

function deleteJobApplicationForJobPosting(jobPostingId, jobSource) {
    console.log(jobPostingId);
    console.log(jobSource);

    if (jobSource === 'github' ) {
        return jobApplicationModel.remove({gitHubJobId: jobPostingId});
    }
    else {
        console.log('here');
        console.log(jobApplicationModel.find({jobPosting:jobPostingId}));
        return jobApplicationModel.remove({_id: jobPostingId});
    }

}


function updateJobApplication(jobApplicationId, newJobApplication) {
    return jobApplicationModel.update({_id: jobApplicationId},
        {$set: newJobApplication})
}
