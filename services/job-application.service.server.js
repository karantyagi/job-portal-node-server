module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var jobApplicationModel =
        require('./../models/job-application/job-application.model.server');

    app.get('/api/jobApplication', findAllJobApplicationByUserId);
    app.post('/api/jobApplication', createJobApplication);
    app.delete('/api/jobApplication/:jobApplicationId', deleteJobApplication);
    app.put('/api/jobApplication/:jobApplicationId', updateJobApplication);


    function createJobApplication(req, res) {
        if (req.session && req.session['user']) {
            var jobApplication = req.body;
            console.log(jobApplication);
            const userId = req.session['user']._id;
            jobApplication['user'] = userId;
            jobApplicationModel.createJobApplication(jobApplication)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function findAllJobApplicationByUserId(req, res) {
        if (req.session && req.session['user']) {
            const userId = req.session['user']._id;
            jobApplicationModel.findAllJobApplicationByUserId(userId)
                .then(function (jobApplications) {
                    res.json(jobApplications);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function updateJobApplication(req, res) {
        var jobApplication = req.body;
        var id = req.params['jobApplicationId']
        if (req.session && req.session['user']) {
            jobApplicationModel.updateJobApplication(id,jobApplication)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function deleteJobApplication(req, res) {
        if (req.session && req.session['user']) {
            var id = req.params['jobApplicationId']
            jobApplicationModel.deleteJobApplication(id).then(function (status) {
                res.send(status);
            })
        }
        else {
            res.send('no-session-exists');
        }
    }
};
