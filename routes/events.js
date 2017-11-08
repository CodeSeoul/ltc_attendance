const router = require('express').Router();
const isLoggedIn = require('./loginCheck');
const checkInRepo = require('../src/checkInRepository');
const eventRepo = require('../src/eventRepository');

// TODO: convert to middleware
const canEditEvents = (user) => {
    if (user === null) {
        return false;
    }
    return user.get('level') === 'instructor' || user.get('level') === 'admin';
};

router.get('/', function (req, res) {
    return eventRepo.getEvents()
        .then(events => {
            res.render('events/index', {events: events.models, authedUser: req.user});
        });
});

router.get('/create',
    isLoggedIn,
    (req, res) => {
        res.render('events/create', {canEdit: canEditEvents(req.user), authedUser: req.user});
    }
);

router.post('/create',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            eventRepo.createEvent(req.body, req.user.get('id'))
                .then(() => {
                    console.log('created event successfully');
                    res.redirect('/events');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/events/create');
                });
        } else {
            res.send(403);
        }
    }
);

router.get('/:id', (req, res) => {
    eventRepo.getEventWithFullDetails(req.params.id)
        .then(event => {
            console.log('event.instructors:', event.instructors());
            event.instructors().fetch()
                .then(instructors => {
                    console.log('after promise');
                    console.log(instructors);
                    res.render('events/show', {event: event, instructors: instructors, authedUser: req.user});
                })
                .catch(err => {
                    console.log('err retrieving instructors for event id', req.params.id, '. err:', err);
                    res.render('events/show', {event: event, authedUser: req.user});
                });

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
            eventRepo.getEvent(req.params.id)
                .then(event => {
                    res.render('events/edit', {event: event, authedUser: req.user});
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
            eventRepo.updateEvent(req.params.id, req.body)
                .then(() => {
                    res.redirect('/events/' + req.params.id);
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
        eventRepo.getEvent(req.params.id)
            .then(event => {
                checkInRepo.createCheckIn(req.user, event)
                    .then(checkIn => {
                        //console.log('checkIn: ', checkIn);
                        res.render('events/show', {event: event, checkedIn: true, authedUser: req.user});
                    })
                    .catch(err => {
                        console.log(err);
                        res.render('events/show', {event: event, errorMessage: err, authedUser: req.user})
                    });
            })
            .catch(err => {
                console.log(err);
                res.render('events/show', {event: null, errorMessage: err, authedUser: req.user})
            });
    }
);

router.post('/:id/delete',
    isLoggedIn,
    (req, res) => {
        if (canEditEvents(req.user)) {
            eventRepo.deleteEvent(req.params.id)
                .then(() => {
                    res.redirect('/events');
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
