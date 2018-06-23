module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var skillModel =
        require('./../models/skill/skill.model.server');

    app.get('/api/skill', findSkillByUserId);
    app.post('/api/skill', createSkill);
    app.put('/api/skill/:skillId', updateSkill);
    app.delete('/api/skill/:skillId', deleteSkill);


    function createSkill(req, res) {
        var skill = req.body;
        if (req.session && req.session['user']) {
            skill['user'] = req.session['user']._id;
            skillModel.createSkill(skill)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function findSkillByUserId(req, res) {
        if (req.session && req.session['user']) {
            var userId = req.params['userId']._id;
            skillModel.findSkillByUserId(userId)
                .then(function (skill) {
                    res.json(skill);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function updateSkill(req, res) {
        var skill = req.body;
        var skillId = req.params['skillId'];
        if (req.session && req.session['user']) {
            skillModel.updateSkill(skillId,skill)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteSkill(req, res) {
        if (req.session && req.session['user']) {
            var id = req.params['skillId'];
            skillModel.deleteSkill(id).then(function (status) {
                res.send(status);
            })

        }
        else {
            res.send('session expired');
        }
    }
};
