module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var awardModel =
        require('./../models/award/award.model.server');

    app.get('/api/award', findAwardByUserId);
    app.post('/api/award', createAward);
    app.put('/api/award/:awardId', updateAward);
    app.delete('/api/award/:awardId', deleteAward);


    function createAward(req, res) {
        var award = req.body;
        if (req.session && req.session['user']) {
            award['user'] = req.session['user']._id;
            awardModel.createAward(award)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function findAwardByUserId(req, res) {
        if (req.session && req.session['user']) {
            var userId = req.params['userId']._id;
            awardModel.findAwardByUserId(userId)
                .then(function (award) {
                    res.json(award);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function updateAward(req, res) {
        var award = req.body;
        var awardId = req.param['awardId'];
        if (req.session && req.session['user']) {
            awardModel.updateAward(awardId,award)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteAward(req, res) {
        if (req.session && req.session['user']) {
            var id = req.param['awardId'];
            awardModel.deleteAward(id).then(function (status) {
                res.send(status);
            })

        }
        else {
            res.send('session expired');
        }
    }
};
