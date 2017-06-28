const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Course = mongoose.model('Course', {
  title: {type: String, required: true},
  description: String
})

// Course.create({title: "Linux", description: "Shell programming"});
// Course.create({title: "Windows", description: "Y u no unix based system"});
// Course.create({title: "Web Dev", description: "All lol cats"});
// Course.create({title: "Java", description: "Not just coffee anymore"});


router.get('/', function(req, res, next) {
  Course.find({}, (err, courses) => {
    if (err) return console.log(err);
    res.render('courses', { courses: courses });
  });
});

router.get('/create', (req, res)=>{
  res.render('createCourse')
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
      res.render('course', {course: course});
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
      res.render('editCourse', {course: course});
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
