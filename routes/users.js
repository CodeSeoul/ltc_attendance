const express = require('express');
const router = express.Router();
const userRepo = require('../src/userRepository');
const passport = require('passport')
    ,LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(null,
    (username, password, done) => {
        userRepo.getUserByUsername(username, (user) => {
            if (user.err) { return done(user.err); }

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            user.comparePassword(password, (err, isMatch) => {
                if (err) { return done(err); }

                if (isMatch) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Incorrect password.' });
            });
        });
    }
));

router.get('/', (req, res) => {
    userRepo.getUsers(users => {
        res.render('users/index', {users: users});
    });
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/signup', (req, res) => {
    console.log('signup...req.body');
    console.log(req.body);
    userRepo.getUserByEmail(req.body.email, cb => {
        if (cb === null) {
            userRepo.createUser(req.body, cb => {
                if (cb.err) {
                    //const error = 'Unable to create user';
                    res.render('users/signup', {error: cb.err, course: req.body});
                } else {
                    //const success = 'to the class ' + req.body.username + '!';
                    res.redirect('/users');
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

router.post('/login', () => {
    passport.authenticate('local', {
        successRedirect: '/courses',
        failureRedirect: '/users/login',
        failureFlash: true
    })
});

router.get('/:id', (req, res) => {
    userRepo.getUser(req.params.id, user => {
        res.render('users/show', {user: user});
    });
});

router.get('/:id/edit', (req, res) => {
    userRepo.getUser(req.params.id, user => {
        res.render('users/edit', {user: user});
    });
});

router.post('/:id', (req, res) => {
    userRepo.updateUser(req.params.id, req.body, user => {
        console.log('user...........');
        console.log(user);
        res.redirect('/users/' + req.params.id);
    });
});

router.post('/:id/delete', (req, res) => {
    userRepo.deleteUser(req.params.id, () => {
        res.redirect('/users');
    });
});

module.exports = router;
