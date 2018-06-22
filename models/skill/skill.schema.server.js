var mongoose = require('mongoose');
var skillSchema = mongoose.Schema({
    skill : String,
    level : String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'Skill'});

module.exports = skillSchema;
