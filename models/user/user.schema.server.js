var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    tagline: String,
    imageUrl: String,
    role: String, // role : Admin, JobSeeker , Recruiter
    requestStatus: String, // 'status types : 'Pending' && 'Verified''
    socialContact: [{ socialtype: String, url: String }],
    recruiter: {type: mongoose.Schema.Types.ObjectId, ref:'RecruiterDetailModel'},
    experience: {type: mongoose.Schema.Types.ObjectId, ref:'ExperienceModel'},
    education: {type: mongoose.Schema.Types.ObjectId, ref:'EducationModel'},
    skills: {type: mongoose.Schema.Types.ObjectId, ref:'SkillModel'},
    projects: {type: mongoose.Schema.Types.ObjectId, ref:'Project'},
    extraCurricular: {type: mongoose.Schema.Types.ObjectId, ref:'ExtraCurricularModel'},
    awards: {type: mongoose.Schema.Types.ObjectId, ref:'AwardModel'},
    certificates: {type: mongoose.Schema.Types.ObjectId, ref:'CertificateModel'}

}, {collection: 'User'});

module.exports = userSchema;
