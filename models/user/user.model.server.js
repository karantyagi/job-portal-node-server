var mongoose =
    require('mongoose');
var userSchema =
    require('./user.schema.server');
var userModel = mongoose
    .model('UserModel', userSchema);

module.exports = {
    findUserById: findUserById,
    findRecruiterbyId: findRecruiterbyId,
    findAllUsers:findAllUsers,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    findPendingRecruiters: findPendingRecruiters,
    approveRecruiter: approveRecruiter,
    // imageUrlUpload: imageUrlUpload
};

function findAllUsers() {
    return userModel.find();
}

function findPendingRecruiters() {
    return userModel.find({requestStatus:'Pending'},{password:0});
}


function findUserById(userId) {
    return userModel.findById(userId,{password:0});
}


function findRecruiterbyId(userId) {
    console.log('     ID :     ', userId);
    return userModel.find({user: userId})
        .populate('recruiter')
        .exec();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username},{password: 0});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({
        username: username, password: password
    },{password: 0});
}

function createUser(user) {
    console.log(user);
    if (user.role === 'Recruiter') {
        user['requestStatus']='Pending'
    }
    return userModel.create(user);
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId},
        {$set: newUser})
}
function approveRecruiter(userId) {
    return userModel.update({_id: userId},
        {$set: {requestStatus: 'Verified'}})
}

// function imageUrlUpload(userId, imageUrl) {
//     return userModel.update({_id: userId},
//         {$set: {imageUrl: imageUrl}})
// }
