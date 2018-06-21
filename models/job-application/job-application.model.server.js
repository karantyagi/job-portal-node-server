// var mongoose =
//     require('mongoose');
// var userSchema =
//     require('./recruiter-detail.schema.server');
// var userModel = mongoose
//     .model('UserModel', userSchema);
//
//
// module.exports = {
//     findUserById: findUserById,
//     findAllUsers:findAllUsers,
//     findUserByUsername: findUserByUsername,
//     findUserByCredentials: findUserByCredentials,
//     createUser: createUser,
//     deleteUser: deleteUser,
//     updateUser: updateUser
// };
//
// function findAllUsers() {
//     return userModel.find();
// }
//
//
// function findUserById(userId) {
//     return userModel.findById(userId,{password:0});
// }
//
// function findUserByUsername(username) {
//     return userModel.findOne({username: username},{password: 0});
// }
//
// function findUserByCredentials(username, password) {
//     return userModel.findOne({
//         username: username, password: password
//     },{password: 0});
// }
//
// function createUser(user) {
//     console.log(user);
//     return userModel.create(user);
// }
//
// function deleteUser(userId) {
//     return userModel.remove({_id: userId});
// }
//
// function updateUser(userId, newUser) {
//     return userModel.update({_id: userId},
//         {$set: newUser})
// }
//
//
//
//
