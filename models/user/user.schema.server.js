var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    tagline: String,
    role: String,
    requestStatus: String, // 'status types : 'Pending' && 'Verified''
    socialContact: [{ socialtype: String, url: String }],
    recruiter: {type: mongoose.Schema.Types.ObjectId, ref:'RecruiterDetail'},
    experience: {type: mongoose.Schema.Types.ObjectId, ref:'Experience'},
    education: {type: mongoose.Schema.Types.ObjectId, ref:'Education'},
    skills: {type: mongoose.Schema.Types.ObjectId, ref:'Skill'},
    projects: {type: mongoose.Schema.Types.ObjectId, ref:'Project'},
    extraCurricular: {type: mongoose.Schema.Types.ObjectId, ref:'ExtraCurricular'},
    awards: {type: mongoose.Schema.Types.ObjectId, ref:'Award'},
    certificates: {type: mongoose.Schema.Types.ObjectId, ref:'Certificate'}

}, {collection: 'User'});

module.exports = userSchema;
