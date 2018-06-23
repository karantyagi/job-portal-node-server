module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var extraCurricularModel =
        require('./../models/extra-curricular/extra-curricular.model.server');

    app.get('/api/extraCurricular', findExtraCurricularByUserId);
    app.post('/api/extraCurricular', createExtraCurricular);
    app.put('/api/extraCurricular/:extraCurricularId', updateExtraCurricular);
    app.delete('/api/extraCurricular/:extraCurricularId', deleteExtraCurricular);


    function createExtraCurricular(req, res) {
        var extraCurricular = req.body;
        if (req.session && req.session['user']) {
            extraCurricular['user'] = req.session['user']._id;
            extraCurricularModel.createExtraCurricular(extraCurricular)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function findExtraCurricularByUserId(req, res) {
        if (req.session && req.session['user']) {
            var userId = req.params['userId']._id;
            extraCurricularModel.findExtraCurricularByUserId(userId)
                .then(function (extraCurricular) {
                    res.json(extraCurricular);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function updateExtraCurricular(req, res) {
        var extraCurricular = req.body;
        var extraCurricularId = req.params['extraCurricularId'];
        if (req.session && req.session['user']) {
            extraCurricularModel.updateExtraCurricular(extraCurricularId,extraCurricular)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteExtraCurricular(req, res) {
        if (req.session && req.session['user']) {
            var id = req.params['extraCurricularId'];
            extraCurricularModel.deleteExtraCurricular(id).then(function (status) {
                res.send(status);
            })

        }
        else {
            res.send('session expired');
        }
    }
};
