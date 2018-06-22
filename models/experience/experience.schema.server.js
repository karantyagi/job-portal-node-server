var mongoose = require('mongoose');
var experienceSchema = mongoose.Schema({
    title : String,
    company : String,
    location : String,
    startDate : Date,
    endDate : Date,
    ongoingStatus: String,
    description: String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'Experience'});

module.exports = experienceSchema;
