module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var recruiterModel =
        require('./../models/recruiter-detail/recruiter-detail.model.server');

    app.get('/api/recruiter', findAllRecruiter);
    app.get('/api/recruiter/user', findRecruiterDetailByUserId);
    app.post('/api/recruiter', createRecruiterDetail);
    app.put('/api/recruiter/:recruiterId', updateRecruiterDetail);
    app.delete('/api/recruiter/:recruiterId', deleteRecruiterDetail);


    function findAllRecruiter(req, res) {
        recruiterModel.findAllRecruiter()
            .then(function (recruiter) {
                res.send(recruiter);
            });
    }

    function createRecruiterDetail(req, res) {
        var recruiter = req.body;
        if (req.session && req.session['user']) {
            recruiter['user'] = req.session['user']._id;
            recruiterModel.createRecruiterDetail(recruiter)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function findRecruiterDetailByUserId(req, res) {
        if (req.session && req.session['user']) {
            var userId = req.session['user']._id;
            recruiterModel.findRecruiterDetailByUserId(userId)
                .then(function (recruiterDetails) {
                    res.json(recruiterDetails);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function updateRecruiterDetail(req, res) {
        var recruiter = req.body;
        var recruiterId = req.params['recruiterId'];
        if (req.session && req.session['user']) {
            recruiterModel.updateRecruiterDetail(recruiterId,recruiter)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteRecruiterDetail(req, res) {
        if (req.session && req.session['user']) {
            var id = req.params['recruiterId'];
            recruiterModel.deleteRecruiterDetail(id).then(function (status) {
                res.send(status);
            })

        }
        else {
            res.send('session expired');
        }
    }
};
