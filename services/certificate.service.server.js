module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var certificateModel =
        require('./../models/certificate/certificate.model.server');

    app.get('/api/certificate', findCertificateByUserId);
    app.post('/api/certificate', createCertificate);
    app.put('/api/certificate/:certificateId', updateCertificate);
    app.delete('/api/certificate/:certificateId', deleteCertificate);


    function createCertificate(req, res) {
        var certificate = req.body;
        if (req.session && req.session['user']) {
            certificate['user'] = req.session['user']._id;
            certificateModel.createCertificate(certificate)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function findCertificateByUserId(req, res) {
        if (req.session && req.session['user']) {
            var userId = req.params['userId']._id;
            certificateModel.findCertificateByUserId(userId)
                .then(function (certificate) {
                    res.json(certificate);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function updateCertificate(req, res) {
        var certificate = req.body;
        var certificateId = req.param['certificateId'];
        if (req.session && req.session['user']) {
            certificateModel.updateCertificate(certificateId,certificate)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteCertificate(req, res) {
        if (req.session && req.session['user']) {
            var id = req.param['certificateId'];
            certificateModel.deleteCertificate(id).then(function (status) {
                res.send(status);
            })

        }
        else {
            res.send('session expired');
        }
    }
};
