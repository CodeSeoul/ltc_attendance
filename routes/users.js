const express = require('express');
const router = express.Router();
const userRepo = require('../src/userRepository');
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log('local strategy call invoked');
        userRepo.getUserByUsername(username, (user) => {
            console.log('passport auth getting user by username');
            if (user.err) {
                return done(user.err);
            }

            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }

                if (isMatch) {
                    return done(null, user);
                }
                return done(null, false, {message: 'Incorrect password.'});
            });
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

router.get('/', (req, res) => {
    userRepo.getUsers(users => {
        res.render('users/index', {users: users, authedUser: req.user});
    });
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/signup', (req, res) => {
    console.log('signup...req.body');
    console.log(req.body);
    userRepo.getUserByUsername(req.body.username, cb => {
        if (cb === null) {
            userRepo.createUser(req.body, cb => {
                if (cb.err) {
                    //const error = 'Unable to create user';
                    res.render('users/signup', {error: cb.err, course: req.body});
                } else {
                    //const success = 'to the class ' + req.body.username + '!';
                    req.login(cb, (err) => {
                        if (err) {
                            return next(err);
                        }
                        return res.redirect('/users');
                    });
                }
            });
        } else {
            //const success = 'back to class ' + req.body.username + '!';
            res.redirect('/courses');
        }
    });
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.render('users/logout')
});

router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        res.redirect('/courses');
    }
);

router.get('/:id', (req, res) => {
    userRepo.getUser(req.params.id, user => {
        res.render('users/show', {user: user, authedUser: req.user});
    });
});

router.get('/:id/edit', (req, res) => {
    if (req.params.id !== req.user._id) {
        res.redirect('/users');
    } else {
        userRepo.getUser(req.params.id, user => {
            res.render('users/edit', {user: user, authedUser: req.user});
        });
    }
});

router.post('/:id', (req, res) => {
    userRepo.updateUser(req.params.id, req.body, user => {
        console.log('user...........');
        console.log(user);
        res.redirect('/users/' + req.params.id);
    });
});

router.post('/:id/delete', (req, res) => {
    if (req.params.id !== req.user._id) {
        res.redirect('/users');
    } else {
        userRepo.deleteUser(req.params.id, () => {
            res.redirect('/users');
        });
    }
});

module.exports = router;
