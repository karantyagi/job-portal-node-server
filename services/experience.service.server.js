module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var experienceModel =
        require('./../models/experience/experience.model.server');

    app.get('/api/experience', findExperienceByUserId);
    app.post('/api/experience', createExperience);
    app.put('/api/experience/:experienceId', updateExperience);
    app.delete('/api/experience/:experienceId', deleteExperience);


    function createExperience(req, res) {
        var experience = req.body;
        if (req.session && req.session['user']) {
            experience['user'] = req.session['user']._id;
            experienceModel.createExperience(experience)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function findExperienceByUserId(req, res) {
        if (req.session && req.session['user']) {
            var userId = req.params['userId']._id;
            experienceModel.findExperienceByUserId(userId)
                .then(function (experience) {
                    res.json(experience);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function updateExperience(req, res) {
        var experience = req.body;
        var experienceId = req.param['experienceId'];
        if (req.session && req.session['user']) {
            experienceModel.updateExperience(experienceId,experience)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteExperience(req, res) {
        if (req.session && req.session['user']) {
            var id = req.param['experienceId'];
            experienceModel.deleteExperience(id).then(function (status) {
                res.send(status);
            })
        }
        else {
            res.send('session expired');
        }
    }
};
