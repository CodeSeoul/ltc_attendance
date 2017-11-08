const router = require('express').Router();
const isLoggedIn = require('./loginCheck');
const courseRepo = require('../src/CourseRepo');
const checkInRepo = require('../src/checkInRepository');

// TODO: convert to middleware
const canEditEvents = (user) => {
    if (user === null) {
        return false;
    }
    return user.get('level') === 'instructor' || user.get('level') === 'admin';
};

router.get('/', function (req, res) {
    return courseRepo.getCourses()
        .then(courses => {
            res.render('courses/index', {courses: courses.models, authedUser: req.user});
        });
});

router.get('/create',
    isLoggedIn,
    (req, res) => {
        res.render('courses/create', {canEdit: canEditEvents(req.user), authedUser: req.user});
    }
);

router.post('/create',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            courseRepo.createCourse(req.body, req.user.get('id'))
                .then(() => {
                    console.log('created course successfully');
                    res.redirect('/courses');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/courses/create');
                });
        } else {
            res.send(403);
        }
    }
);

router.get('/:id', (req, res) => {
    courseRepo.getCourse(req.params.id)
        .then(course => {
            res.render('courses/show', {course: course, authedUser: req.user});
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
});

router.get('/:id/edit',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            courseRepo.getCourse(req.params.id)
                .then(course => {
                    res.render('courses/edit', {course: course, authedUser: req.user});
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/');
                });
        } else {
            res.send(403);
        }
    }
);

router.post('/:id',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            courseRepo.updateCourse(req.params.id, req.body)
                .then(() => {
                    res.redirect('/courses/' + req.params.id);
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/');
                });
        } else {
            res.send(403);
        }
    }
);

router.post('/:id/checkin',
    isLoggedIn,
    (req, res) => {
        const course = courseRepo.getCourse(req.params.id)
            .then(course => course)
            .catch(err => {
                console.log(err);
                res.render('courses/show', {course: null, errorMessage: err, authedUser: req.user})
            });

        checkInRepo.createCheckIn(req.user, course)
            .then(() => {
                res.render('courses/show', {course: course, checkedIn: true, authedUser: req.user});
            })
            .catch(err => {
                console.log(err);
                res.render('courses/show', {course: course, errorMessage: err, authedUser: req.user})
            });
    }
);

router.post('/:id/delete',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            courseRepo.deleteCourse(req.params.id)
                .then(() => {
                    res.redirect('/courses');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/');
                });
        } else {
            res.send(403);
        }
    }
);

module.exports = router;
