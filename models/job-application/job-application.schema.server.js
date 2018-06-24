var mongoose = require('mongoose');
var jobApplicationSchema = mongoose.Schema({
    dateApplied : Date,
    status: String, // save or applied
    jobSource: String, // github or job-portal
    gitHubJobId: String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    jobPosting : {type: mongoose.Schema.Types.ObjectId, ref: 'JobPostingModel'}

}, {collection: 'JobApplication'});

module.exports = jobApplicationSchema;
