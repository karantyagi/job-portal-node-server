var mongoose =
    require('mongoose');
var awardSchema =
    require('./award.schema.server');
var awardModel = mongoose
    .model('AwardModel', awardSchema);


module.exports = {
    findAwardByUserId: findAwardByUserId,
    createAward: createAward,
    deleteAward: deleteAward,
    updateAward: updateAward
};

function findAwardByUserId(userId) {
    return awardModel.findById(userId);
}

function createAward(award) {
    return awardModel.create(award);
}

function deleteAward(awardId) {
    return awardModel.remove({_id: awardId});
}

function updateAward(awardId, newAward) {
    return awardModel.update({_id: awardId},
        {$set: newAward})
}
