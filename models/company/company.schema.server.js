var mongoose = require('mongoose');
var companySchema = mongoose.Schema({
    name : String,
    location : String,
    website : String,
    companySize : Number,
    //user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'Company'});

module.exports = companySchema;
