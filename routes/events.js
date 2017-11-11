const router = require('express').Router();
const Event = require('../models/Event')

router.get('/', function(req, res, next) {
  Event.find({}).sort({createdAt: -1}).exec((err, events) => {
    if (err) return console.log(err);
    res.render('events/index', { events: events });
  });
});

router.get('/create', (req, res)=>{
  res.render('events/create')
})

router.post('/create', (req, res) => {
  Event.create(req.body, (err, newEvent) => {
    console.log("this is the post request");
    if (err) {
      console.log(err);
      res.redirect('/events/create');
    } else {
      res.redirect('/events');
    }
  });
});

router.get('/:id', (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('events/show', {event: event});
    }
  });
});

router.get('/:id/edit', (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    console.log("in id/edit of " + req.params.id);
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('events/edit', {event: event});
    }
  });
});

router.post('/:id', (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect('/events/' + req.params.id);
    }
  });
});

router.get('/:id/checkin', (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
    } else {
      res.render('users/signup', {event: event})
    }
  });
});

router.post('/:id/delete', (req, res) => {
  Event.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect('/events');
    }
  });
});

module.exports = router;
