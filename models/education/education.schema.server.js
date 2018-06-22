var mongoose = require('mongoose');
var educationSchema = mongoose.Schema({
    institute : String,
    location : String,
    degree : String,
    startDate : Date,
    endDate : Date,
    ongoingStatus: String,
    fieldOfStudy: String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'Education'});

module.exports = educationSchema;
