var mongoose =
    require('mongoose');
var educationSchema =
    require('./education.schema.server');
var educationModel = mongoose
    .model('EducationModel', educationSchema);


module.exports = {
    findAllEducation:findAllEducation,
    findEducationByUserId: findEducationByUserId,
    createEducation: createEducation,
    deleteEducation: deleteEducation,
    updateEducation: updateEducation
};

function findAllEducation() {
    return educationModel.find();
}

function findEducationByUserId(userId) {
    return educationModel.find({user: userId});
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
