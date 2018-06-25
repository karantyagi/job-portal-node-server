var mongoose =
    require('mongoose');
var recruiterDetailSchema =
    require('./recruiter-detail.schema.server');
var recruiterDetailModel = mongoose
    .model('RecruiterDetailModel', recruiterDetailSchema);


module.exports = {
    findAllRecruiter: findAllRecruiter,
    findRecruiterDetailByUserId: findRecruiterDetailByUserId,
    createRecruiterDetail: createRecruiterDetail,
    deleteRecruiterDetail: deleteRecruiterDetail,
    updateRecruiterDetail: updateRecruiterDetail
};

function findAllRecruiter() {
    return recruiterDetailModel.find();
}


function findRecruiterDetailByUserId(userId) {
    return recruiterDetailModel.findOne({user: userId});
}

function createRecruiterDetail(recruiterDetail) {
    console.log(recruiterDetail);
    return recruiterDetailModel.create(recruiterDetail);
}

function deleteRecruiterDetail(recruiterDetailId) {
    return recruiterDetailModel.remove({_id: recruiterDetailId});
}

function updateRecruiterDetail(recruiterDetailId, newRecruiterDetail) {
    return recruiterDetailModel.update({_id: recruiterDetailId},
        {$set: newRecruiterDetail})
}




