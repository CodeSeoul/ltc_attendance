const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const userRepo = require('../src/userRepository')

router.get('/', (req, res) => {
  userRepo.getUsers(users => {
    res.render('users/index', { users: users });
  });
});

router.get('/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/signup', (req, res) => {
  console.log('signup...req.body')
  console.log(req.body)
  userRepo.getUserByEmail(req.body.email, cb => {
    if (cb === null) {
      userRepo.createUser(req.body, cb => {
        if (cb.err) {
          const error = 'Unable to create user';
          res.render('users/signup', {error: cb.err, event: req.body});
        } else {
          const success = 'to the class ' + req.body.name + '!';
          res.redirect('/users');
        }
      });
    } else {
      userRepo.createCheckIn(req.body, cb => {
        const success = 'back to class ' + req.body.name + '!';
        res.redirect('/users');
      });
    }
  });
});

router.get('/:id', (req, res) => {
  userRepo.getUser(req.params.id, user => {
    res.render('users/show', { user, user });
  });
});

router.get('/:id/edit', (req, res) => {
  userRepo.getUser(req.params.id, user => {
    res.render('users/edit', { user: user });
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
  userRepo.deleteUser(req.params.id, result => {
    res.redirect('/users');
  });
});

module.exports = router;
