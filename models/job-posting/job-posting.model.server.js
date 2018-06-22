var mongoose =
    require('mongoose');
var jobPostingSchema =
    require('./job-posting.schema.server');
var jobPostingModel = mongoose
    .model('JobPostingModel', jobPostingSchema);


module.exports = {
    findJobPostingById: findJobPostingById,
    findAllJobPostings:findAllJobPostings,
    findJobPostingByLocation: findJobPostingByLocation,
    findJobPostingByType: findJobPostingByType,
    createJobPosting: createJobPosting,
    deleteJobPosting: deleteJobPosting,
    updateJobPosting: updateJobPosting
};

function findAllJobPostings() {
    return jobPostingModel.find();
}


function findJobPostingById(jobPostingId) {
    return jobPostingModel.findById(jobPostingId);
}

function findJobPostingByLocation(location) {
    return jobPostingModel.findOne({location: location});
}

function findJobPostingByType(type) {
    return jobPostingModel.findOne({type: type});
}

function createJobPosting(jobPosting) {
    console.log(jobPosting);
    return jobPostingModel.create(jobPosting);
}

function deleteJobPosting(jobPostingId) {
    return jobPostingModel.remove({_id: jobPostingId});
}

function updateJobPosting(jobPostingId, newJobPosting) {
    return jobPostingModel.update({_id: jobPostingId},
        {$set: newJobPosting})
}