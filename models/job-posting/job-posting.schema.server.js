var mongoose = require('mongoose');
var jobPostingSchema = mongoose.Schema({
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
    company : {type: mongoose.Schema.Types.ObjectId, ref: 'CompanyModel'}

}, {collection: 'JobPosting'});

module.exports = jobPostingSchema;
