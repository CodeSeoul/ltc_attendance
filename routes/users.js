const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const userRepo = require('../src/UserRepository')

router.get('/', (req, res) => {
  userRepo.getUsers(users => {
    res.render('users/index', { users: users });
  });
});

router.get('/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/signup', (req, res) => {
  userRepo.createUser(req.body, cb => {
    res.redirect('/users');
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
    res.redirect('/users/' + req.params.id);
  });
});

router.post('/:id/delete', (req, res) => {
  userRepo.deleteUser(req.params.id, result => {
    res.redirect('/users');
  });
});

module.exports = router;
