const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://heroku_d895z9hp:74v0ph37vib5v5gf02jb675acf@ds135522.mlab.com:35522/heroku_d895z9hp', err => {
  if (err) {
  console.log("couldn't connect to MongoDB");
  }
  console.log('#connected to MongoDB!')
})

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  level: { type: String, default: 'student' },
});

let User = mongoose.model("User", userSchema);

// dummy data
// User.create({name: 'Dale', email: 'dale@gmail.com'});
// User.create({name: 'Beege', email: 'beege@gmail.com'});
// User.create({name: 'Ben', email: 'ben@gmail.com'});
// User.create({name: 'Charile', email: 'charlie@gmail.com'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) return console.log(err); 
    res.render('users', { users: users });
  });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  User.create({name: name, email: email}, (err, newUser) => {
    if (err) {
      console.log(err);
      res.redirect('/signup');
    } else {
      res.redirect('/');
    }
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err); 
      res.redirect('/');
    } else {
      res.render('user', {user: user});
    }
  });
});

router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err); 
      res.redirect('/');
    } else {
      res.render('edit', {user: user});
    }
  });
});

router.post('/:id', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  User.findByIdAndUpdate(req.params.id, {name: name, email: email}, (err, result) => {
    if (err) {
      console.log(err); 
      res.redirect('/');
    } else {
      res.redirect('/users/' + req.params.id);
    }
  });
});

router.post('/:id/delete', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      console.log(err); 
      res.redirect('/');
    } else {
      res.redirect('/users');
    }
  });
});

module.exports = router;
