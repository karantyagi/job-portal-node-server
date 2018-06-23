module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var educationModel =
        require('./../models/education/education.model.server');

    app.get('/api/education', findAllEducation);
    app.get('/api/education/user', findEducationByUserId);
    app.post('/api/education', createEducation);
    app.put('/api/education/:educationId', updateEducation);
    app.delete('/api/education/:educationId', deleteEducation);


    function findAllEducation(req, res) {
        educationModel.findAllEducation()
            .then(function (education) {
                res.send(education);
            });
    }

    function createEducation(req, res) {
        var education = req.body;
        if (req.session && req.session['user']) {
            education['user'] = req.session['user']._id;
            educationModel.createEducation(education)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function findEducationByUserId(req, res) {
        if (req.session && req.session['user']) {
            var userId = req.session['user']._id;
            console.log('TEST : ', userId);
            educationModel.findEducationByUserId(userId)
                .then(function (education) {
                    res.json(education);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function updateEducation(req, res) {
        var education = req.body;
        var educationId = req.params['educationId'];
        if (req.session && req.session['user']) {
            educationModel.updateEducation(educationId,education)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteEducation(req, res) {
        if (req.session && req.session['user']) {
            var id = req.params['educationId'];
            educationModel.deleteEducation(id).then(function (status) {
                res.send(status);
            })
        }
        else {
            res.send('session expired');
        }
    }
};
