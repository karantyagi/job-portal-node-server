var mongoose = require('mongoose');
var awardSchema = mongoose.Schema({
    title : String,
    associatedWith : String,
    dateConferred : Date,
    issuer : String,
    description : String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'Award'});

module.exports = awardSchema;
