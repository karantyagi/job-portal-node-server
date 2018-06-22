var mongoose =
    require('mongoose');
var experienceSchema =
    require('./experience.schema.server');
var experienceModel = mongoose
    .model('ExperienceModel', experienceSchema);


module.exports = {
    findExperienceByUserId: findExperienceByUserId,
    createExperience: createExperience,
    deleteExperience: deleteExperience,
    updateExperience: updateExperience
};

function findExperienceByUserId(userId) {
    return experienceModel.findById(userId);
}

function createExperience(experience) {
    return experienceModel.create(experience);
}

function deleteExperience(experienceId) {
    return experienceModel.remove({_id: experienceId});
}

function updateExperience(experienceId, newExperience) {
    return experienceModel.update({_id: experienceId},
        {$set: newExperience})
}
