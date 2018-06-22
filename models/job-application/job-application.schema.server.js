var mongoose = require('mongoose');
var jobApplicationSchema = mongoose.Schema({
    dateApplied : Date,
    status: String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    jobPosting : {type: mongoose.Schema.Types.ObjectId, ref: 'JobPostingModel'}

}, {collection: 'JobApplication'});

module.exports = jobApplicationSchema;
