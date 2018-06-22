var mongoose = require('mongoose');
var recruiterDetailSchema = mongoose.Schema({
    title : String,
    company : {type: mongoose.Schema.Types.ObjectId, ref: 'CompanyModel'}
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'RecruiterDetail'});

module.exports = recruiterDetailSchema;
