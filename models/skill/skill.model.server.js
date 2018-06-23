var mongoose =
    require('mongoose');
var skillSchema =
    require('./skill.schema.server');
var skillModel = mongoose
    .model('SkillModel', skillSchema);


module.exports = {
    findAllSkills:findAllSkills,
    findSkillByUserId: findSkillByUserId,
    createSkill: createSkill,
    deleteSkill: deleteSkill,
    updateSkill: updateSkill
};


function findSkillByUserId(userId) {
    return skillModel.find({user: userId});
}

function findAllSkills() {
    return skillModel.find();
}


function createSkill(skill) {
    console.log(skill);
    return skillModel.create(skill);
}

function deleteSkill(skillId) {
    return skillModel.remove({_id: skillId});
}

function updateSkill(skillId, newSkill) {
    return skillModel.update({_id: skillId},
        {$set: newSkill})
}




