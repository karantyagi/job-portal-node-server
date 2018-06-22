var mongoose =
    require('mongoose');
var educationSchema =
    require('./education.schema.server');
var educationModel = mongoose
    .model('EducationModel', educationSchema);


module.exports = {
    findEducationByUserId: findEducationByUserId,
    createEducation: createEducation,
    deleteEducation: deleteEducation,
    updateEducation: updateEducation
};

function findEducationByUserId(userId) {
    return educationModel.findById(userId);
}

function createEducation(education) {
    return educationModel.create(education);
}

function deleteEducation(educationId) {
    return educationModel.remove({_id: educationId});
}

function updateEducation(educationId, newEducation) {
    return educationModel.update({_id: educationId},
        {$set: newEducation})
}
