module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var userModel =
        require('./../models/user/user.model.server');

    // admin access
    app.get('/api/user/', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user/', createUser);

    // users
    app.post('/api/login', login);
    app.post('/api/register', register);
    app.get('/api/profile', getProfile);
    app.post('/api/logout', logout);
    app.put('/api/profile', updateProfile);
    app.delete('/api/profile', deleteUser);


    function createUser(req, res) {
        var user = req.body;

        console.log(user);
        userModel.createUser(user)
            .then(function (status) {
                res.send(status);
            });
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (user) {
                res.send(user);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userId']
        userModel.findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    // function login(req, res) {
    //     var user = req.body;
    //     var username = user.username;
    //     var password = user.password;
    //     userModel.findUserByCredentials(username, password)
    //         .then(function (u) {
    //             if (u != null) {
    //                 req.session['user'] = u;
    //                 res.send(u);
    //             }
    //             else {
    //                 res.send(null);
    //             }
    //         });
    //
    // }

    function login(req, res) {
        var user = req.body;
        var username = user.username;
        var password = user.password;
        userModel.findUserByCredentials(username, password)
            .then((u) =>   {
               if (u!=null){
                   if ((u.role === 'JobSeeker' || u.role === 'Admin')
                       || (u.role === 'Recruiter' && u.requestStatus != 'Pending')){
                       req.session['user']=u;
                       res.json({status:'success',role:u.role})
                   }  else {
                           res.json({status:'Recruiter verification pending',role:null});
                   }

               } else {
                   res.json({status:'user does not exists',role:null});
               }

            });

    }

    function register(req, res) {
        var user = req.body;
        var username = user.username;
        userModel.findUserByUsername(username).then(function (u) {
            console.log(u);
            if (u != null) {
                res.json({status: false});
            } else {
                userModel.createUser(user).then(function (user) {
                    user.password = '';
                    if (user.role!= 'Recruiter') {
                        req.session['user'] = user;
                    }
                    res.json({status: true});
                })
            }
        })

    }

    function getProfile(req, res) {
        if (req.session && req.session['user']) {
            console.log('check this');
            console.log(req.session['user']);
            res.json(req.session['user']);

        } else {
            res.send(null);
        }

    }

    function updateProfile(req, res) {
        if (req.session && req.session['user']) {
            var user = req.session['user'];
            var id = user._id;
           // console.log(id);
            var newUser = req.body;
            userModel.updateUser(id, newUser).then(
                function (status) {
                    id['_id'] = id;
                    req.session['user'] = newUser;
                    res.send(status);
                }
            );

        } else {
            res.send(null);
        }

    }

    function logout(req, res) {
        if (req.session && req.session['user']) {
            //delete req.session['user'];
            req.session.destroy();
            res.send('logged-out');

        }
        else {
            res.send('no-session-exists');
        }

    }

    function deleteUser(req, res) {
        if (req.session && req.session['user']) {
            var id = req.session['user']._id;
            userModel.deleteUser(id).then(function (status) {
                res.send(status);
            })

        }
        else {
            res.send('no-session-exists');
        }
    }
};
