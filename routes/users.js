const express = require('express');
const router = express.Router();
const userRepo = require('../src/userRepository');
const passport = require('passport');
const isLoggedIn = require('./loginCheck');

router.get('/', (req, res) => {
    userRepo.getUsers()
        .then(users => {
            res.render('users/index', {users: users.models, authedUser: req.user});
        });
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/courses',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.render('users/logout')
});

router.post('/login',
    passport.authenticate('local-login'),
    (req, res) => {
        res.redirect('/courses');
    }
);

router.get('/:id', (req, res) => {
    userRepo.getUser(req.params.id)
        .then(user => {
            res.render('users/show', {user: user, authedUser: req.user});
        });
});

router.get('/:id/edit',
    isLoggedIn,
    (req, res) => {
        if (String(req.params.id) !== String(req.user.id)) {
            res.redirect('/users');
        } else {
            userRepo.getUser(req.params.id)
                .then(user => {
                    res.render('users/edit', {user: user, authedUser: req.user});
                });
        }
    }
);

router.post('/:id',
    isLoggedIn,
    (req, res) => {
        userRepo.updateUser(req.params.id, req.body)
            .then(user => {
                console.log('user...........');
                console.log(user);
                res.redirect('/users/' + req.params.id);
            });
    }
);

router.post('/:id/delete',
    isLoggedIn,
    (req, res) => {
        if (req.params.id !== req.user.id) {
            res.redirect('/users');
        } else {
            userRepo.deleteUser(req.params.id)
                .then(() => {
                    res.redirect('/users');
                });
        }
    }
);

module.exports = router;
