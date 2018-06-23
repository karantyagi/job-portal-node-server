module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var projectModel =
        require('./../models/project/project.model.server');

    app.get('/api/project', findProjectByUserId);
    app.post('/api/project', createProject);
    app.put('/api/project/:projectId', updateProject);
    app.delete('/api/project/:projectId', deleteProject);


    function createProject(req, res) {
        var project = req.body;
        if (req.session && req.session['user']) {
            project['user'] = req.session['user']._id;
            projectModel.createProject(project)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function findProjectByUserId(req, res) {
        if (req.session && req.session['user']) {
            var userId = req.params['userId']._id;
            projectModel.findProjectByUserId(userId)
                .then(function (project) {
                    res.json(project);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function updateProject(req, res) {
        var project = req.body;
        var projectId = req.params['projectId'];
        if (req.session && req.session['user']) {
            projectModel.updateProject(projectId,project)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteProject(req, res) {
        if (req.session && req.session['user']) {
            var id = req.params['projectId'];
            projectModel.deleteProject(id).then(function (status) {
                res.send(status);
            })
        }
        else {
            res.send('session expired');
        }
    }
};
