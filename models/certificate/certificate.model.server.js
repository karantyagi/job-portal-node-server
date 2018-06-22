var mongoose =
    require('mongoose');
var certificateSchema =
    require('./certificate.schema.server');
var certificateModel = mongoose
    .model('CertificateModel', certificateSchema);


module.exports = {
    findCertificateByUserId: findCertificateByUserId,
    createCertificate: createCertificate,
    deleteCertificate: deleteCertificate,
    updateCertificate: updateCertificate
};

function findCertificateByUserId(userId) {
    return certificateModel.findById(userId);
}

function createCertificate(certificate) {
    return certificateModel.create(certificate);
}

function deleteCertificate(certificateId) {
    return certificateModel.remove({_id: certificateId});
}

function updateCertificate(certificateId, newCertificate) {
    return certificateModel.update({_id: certificateId},
        {$set: newCertificate})
}
