var mongoose = require('mongoose');
var certificateSchema = mongoose.Schema({
    name : String,
    authority : String,
    licenceNumber : String,
    certificationDate : Date,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'Certificate'});

module.exports = certificateSchema;
