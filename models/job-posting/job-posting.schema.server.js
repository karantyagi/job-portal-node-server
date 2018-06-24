var mongoose = require('mongoose');
var jobPostingSchema = mongoose.Schema({
    title: String,
    datePosted : Date,
    status : String,
    location: String,
    position: String,
    type: String,
    startDate: Date,
    endDate: Date,
    skillsRequired: [String],
    responsibilities: [String],
    minQualification: [String],
    jobSource: String,  // check to differentiate between git hub and job-portal jos postings
   // company : {type: mongoose.Schema.Types.ObjectId, ref: 'CompanyModel'},
    company : String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'} // recruiter who posted it

}, {collection: 'JobPosting'});

module.exports = jobPostingSchema;
