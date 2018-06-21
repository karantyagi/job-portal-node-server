var mongoose = require('mongoose');
var recruiterDetailSchema = mongoose.Schema({
    title : String,
    company : {type: mongoose.Schema.Types.ObjectId, ref: 'Company'}

}, {collection: 'RecruiterDetail'});

module.exports = recruiterDetailSchema;
