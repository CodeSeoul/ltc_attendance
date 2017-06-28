const router = require('express').Router()
const User = require('../models/User')

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
  User.create(req.body, (err, newUser) => {
    if (err) {
      console.log(err);
      res.redirect('/signup');
    } else {
      res.redirect('/users');
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
  User.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
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
