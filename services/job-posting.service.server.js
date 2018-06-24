module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var jobPostingModel =
        require('./../models/job-posting/job-posting.model.server');

    app.get('/api/jobPosting/:jobPostingId', findJobPostingById);
    app.get('/api/allJobPosting', findAllJobPostings);
    app.get('/api/jobPosting', findAllJobPostingByUserId);
    app.post('/api/jobPosting', createJobPosting);
    app.put('/api/jobPosting/:jobPostingId', updateJobPosting);
    app.delete('/api/jobPosting/:jobPostingId', deleteJobPosting);


    function createJobPosting(req, res) {
        var jobPosting = req.body;
        if (req.session && req.session['user'] && req.session['user'].role != 'JobSeeker') {
            jobPosting['user'] = req.session['user']._id;
            jobPostingModel.createJobPosting(jobPosting)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }


    function findAllJobPostingByUserId(req, res) {
        if (req.session && req.session['user'] && req.session['user'].role != 'JobSeeker') {
        var userId = req.session['user']._id;
        jobPostingModel.findJobPostingByUserId(userId)
            .then(function (jobPosting) {
                res.json(jobPosting);
            });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function findJobPostingById(req, res) {
        var jobPostingId = req.params['jobPostingId'];
        jobPostingModel.findJobPostingById(jobPostingId)
            .then(function (jobPosting) {
                res.json(jobPosting);
            });
    }

    function findAllJobPostings(req, res) {
        jobPostingModel.findAllJobPostings()
            .then(function (jobPosting) {
                res.json(jobPosting);
            });
    }


    function updateJobPosting(req, res) {
        var jobPosting = req.body;
        var jobPostingId = req.params['jobPostingId'];
        if (req.session && req.session['user'] && req.session['user'].role != 'JobSeeker') {
            jobPostingModel.updateJobPosting(jobPostingId, jobPosting)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteJobPosting(req, res) {
        if (req.session && req.session['user'] && req.session['user'].role != 'JobSeeker') {
            var id = req.params['jobPostingId'];
            jobPostingModel.deleteJobPosting(id).then(function (status) {
                res.send(status);
            })

        }
        else {
            res.send('session expired');
        }
    }
};
