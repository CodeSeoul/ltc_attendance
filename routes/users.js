const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserRepository = require('../src/UserRepository')
const userRepo = new UserRepository();

router.get('/', (req, res, next) => {
  userRepo.getUsers(users => {
    res.render('users', { users: users });
  });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  userRepo.createUser(req.body, cb => {
    res.redirect('/users');
  });
});

router.get('/:id', (req, res) => {
  userRepo.getUser(req.params.id, user => {
    res.render('user', { user, user });
  });
});

router.get('/:id/edit', (req, res) => {
  userRepo.getUser(req.params.id, user => {
    res.render('edit', { user: user });
  });
});

router.post('/:id', (req, res) => {
  userRepo.updateUser(req.params.id, req.body, user => {
    res.redirect('/users/' + req.params.id);
  });
});

router.post('/:id/delete', (req, res) => {
  userRepo.deleteUser(req.params.id, result => {
    res.redirect('/users');
  });
});

module.exports = router;
