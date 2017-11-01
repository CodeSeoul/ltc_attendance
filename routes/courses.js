const router = require('express').Router();
const Course = require('../models/Course');
const isLoggedIn = require('./loginCheck');
const checkInRepo = require('../src/checkInRepository');

const canEditEvents = (user) => {
    if (user === null) {
        return false;
    }
    return user.level === 'instructor' || user.level === 'admin';
};

router.get('/', function (req, res) {
    Course.find({}).sort({createdAt: -1}).exec((err, courses) => {
        if (err) return console.log(err);
        res.render('courses/index', {courses: courses, authedUser: req.user});
    });
});

router.get('/create',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            res.render('courses/create')
        } else {
            res.status(res.unauthorized).send();
        }
    }
);

router.post('/create',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            Course.create(req.body, (err) => {
                console.log("this is the post request");
                if (err) {
                    console.log(err);
                    res.redirect('/courses/create');
                } else {
                    res.redirect('/courses');
                }
            });
        } else {
            res.status(res.unauthorized).send();
        }
    }
);

router.get('/:id', (req, res) => {
    Course.findById(req.params.id, (err, course) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.render('courses/show', {course: course, authedUser: req.user});
        }
    });
});

router.get('/:id/edit',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            Course.findById(req.params.id, (err, course) => {
                console.log("in id/edit of " + req.params.id);
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    res.render('courses/edit', {course: course, authedUser: req.user});
                }
            });
        } else {
            res.status(res.unauthorized).send();
        }
    }
);

router.post('/:id',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            Course.findByIdAndUpdate(req.params.id, req.body, (err) => {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    res.redirect('/courses/' + req.params.id);
                }
            });
        } else {
            res.status(res.unauthorized).send();
        }
    }
);

router.post('/:id/checkin',
    isLoggedIn,
    (req, res) => {
        Course.findById(req.params.id, (err, course) => {
            if (err) {
                console.log(err);
            } else {
                checkInRepo.createCheckIn(req.user, course, (result) => {
                    if (result.err) {
                        res.render('courses/show', {course: course, errorMessage: result.err, authedUser: req.user})
                    } else {
                        res.render('courses/show', {course: course, checkedIn: true, authedUser: req.user});
                    }
                })
            }
        });
    }
);

router.post('/:id/delete',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            Course.findByIdAndRemove(req.params.id, (err) => {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    res.redirect('/courses');
                }
            });
        } else {
            res.status(res.unauthorized).send();
        }
    }
);

module.exports = router;
