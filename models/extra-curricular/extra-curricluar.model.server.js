var mongoose =
    require('mongoose');
var extraCurricularSchema =
    require('./extra-curricular.schema.server');
var extraCurricularModel = mongoose
    .model('ExtraCurricularModel', extraCurricularSchema);


module.exports = {
    findExtraCurricularByUserId: findExtraCurricularByUserId,
    createExtraCurricular: createExtraCurricular,
    deleteExtraCurricular: deleteExtraCurricular,
    updateExtraCurricular: updateExtraCurricular
};

function findExtraCurricularByUserId(userId) {
    return extraCurricularModel.findById(userId);
}

function createExtraCurricular(extraCurricular) {
    return extraCurricularModel.create(extraCurricular);
}

function deleteExtraCurricular(extraCurricularId) {
    return extraCurricularModel.remove({_id: extraCurricularId});
}

function updateExtraCurricular(extraCurricularId, newExtraCurricular) {
    return extraCurricularModel.update({_id: extraCurricularId},
        {$set: newExtraCurricular})
}
