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

    app.get('/api/experience', findexperienceByUserId);
    app.post('/api/experience', createexperience);
    app.put('/api/experience/:experienceId', updateexperience);
    app.delete('/api/experience/:experienceId', deleteexperience);


    function createexperience(req, res) {
        var experience = req.body;
        if (req.session && req.session['user']) {
            experience['user'] = req.session['user']._id;
            experienceModel.createexperience(experience)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function findexperienceByUserId(req, res) {
        if (req.session && req.session['user']) {
            var userId = req.params['userId']._id;
            experienceModel.findexperienceByUserId(userId)
                .then(function (experience) {
                    res.json(experience);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function updateexperience(req, res) {
        var experience = req.body;
        var experienceId = req.param['experienceId'];
        if (req.session && req.session['user']) {
            experienceModel.updateexperience(experienceId,experience)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteexperience(req, res) {
        if (req.session && req.session['user']) {
            var id = req.param['experienceId'];
            experienceModel.deleteexperience(id).then(function (status) {
                res.send(status);
            })
        }
        else {
            res.send('session expired');
        }
    }
};
