var mongoose =
    require('mongoose');
var companySchema =
    require('./company.schema.server');
var companyModel = mongoose
    .model('CompanyModel', companySchema);


module.exports = {
    findCompanyByUserId: findCompanyByUserId,
    createCompany: createCompany,
    deleteCompany: deleteCompany,
    updateCompany: updateCompany
};

function findCompanyByUserId(userId) {
    return companyModel.findById(userId);
}

function createCompany(company) {
    return companyModel.create(company);
}

function deleteCompany(companyId) {
    return companyModel.remove({_id: companyId});
}

function updateCompany(companyId, newCompany) {
    return companyModel.update({_id: companyId},
        {$set: newCompany})
}
