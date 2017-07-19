const router = require('express').Router();
const Course = require('../models/Course')

router.get('/', function(req, res, next) {
  Course.find({}).sort({createdAt: -1}).exec((err, courses) => {
    if (err) return console.log(err);
    res.render('courses/index', { courses: courses });
  });
});

router.get('/create', (req, res)=>{
  res.render('courses/create')
})

router.post('/create', (req, res) => {
  Course.create(req.body, (err, newCourse) => {
    console.log("this is the post request");
    if (err) {
      console.log(err);
      res.redirect('/courses/create');
    } else {
      res.redirect('/courses');
    }
  });
});

router.get('/:id', (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('courses/show', {course: course});
    }
  });
});

router.get('/:id/edit', (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    console.log("in id/edit of " + req.params.id);
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('courses/edit', {course: course});
    }
  });
});

router.post('/:id', (req, res) => {
  Course.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect('/courses/' + req.params.id);
    }
  });
});

router.get('/:id/checkin', (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    if (err) {
      console.log(err); 
    } else {
      res.render('users/signup', {course: course})
    }
  });
});

router.post('/:id/delete', (req, res) => {
  Course.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect('/courses');
    }
  });
});

module.exports = router;
