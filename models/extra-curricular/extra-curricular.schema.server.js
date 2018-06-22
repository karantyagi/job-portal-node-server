var mongoose = require('mongoose');
var extraCurricularSchema = mongoose.Schema({
    name : String,
    associatedWith : String,
    startDate : Date,
    endDate : Date,
    ongoingStatus: String,
    description: String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'ExtraCurricular'});

module.exports = extraCurricularSchema;
