require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Event = require('../../models/Event').Event;
const User = require('../../models/User').User;
const assert = require('assert');

// TODO: validations
/*
describe('Event model validations', () => {

    let baseEvent;
    let joe;

    beforeEach(() => {
        return new User({
            username: 'joe',
            password: 'mypass',
            email: 'fake@fake.com',
            level: 'student'
        }).save()
            .then(savedUser => {
                joe = savedUser;
                return new Event({
                    title: 'Test Event',
                    description: 'beginner sql',
                    type: 'Workshop',
                    created_by: joe
                }).save()
                    .then(savedBaseEvent => {
                        baseEvent = savedBaseEvent
                    });
            });
    });

    afterEach(() => {
        return knex('event').truncate()
            .then(() => {
                return knex('user').truncate();
            });
    });

    it('Should require title', () => {
        baseEvent.set('title', undefined);
        return baseEvent.save()
            .catch(err => {
                console.log(err);
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The email address is already in use', 'Incorrect error message for missing title. Received: ' + fieldError.message);
                });
            })
            .then(() => {
                assert.fail('Should not allow an undefined title')
            });
    });

    it('Should require title length more than 4 chars', () => {
        baseEvent.set('title', 'r');
        return baseEvent.save()
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The title must be at least 5 characters long', 'Incorrect error message for title >= 5 characters. Received: ' + fieldError.message);
                });
            })
            .then(() => {
                assert.fail('Should not allow title with less than 5 characters');
            });
    });

    it('Should require title length no more than 100 chars', () => {
        baseEvent.set('title', 'r'.repeat(101));
        return baseEvent.save()
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The title must not exceed 100 characters long', 'Incorrect error message for title <= 100 characters. Received: ' + fieldError.message);
                });
            })
            .then(() => {
                assert.fail('Should not permit a title with more than 100 characters');
            });
    });

    it('Should require description length of at least 10 chars', () => {
        baseEvent.set('description', 'rr');
        return baseEvent.save()
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The description must be at least 10 characters long', 'Incorrect error message for description >= 10 characters. Received: ' + fieldError.message);
                });
            })
            .then(() => {
                assert.fail('Should not permit a description less than 10 characters');
            });
    });

    it('Should require description length of no more than 10000 chars', () => {
        baseEvent.set('description', 'r'.repeat(10001));
        return baseEvent.save()
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The description must not exceed 10000 characters long', 'Incorrect error message for description <= 10000 characters. Received: ' + fieldError.message);
                });
            })
            .then(() => {
                assert.fail('Should not permit a description of more than 10000 chars');
            });
    });

    it('Should require type to be one of workshop, course, hack-night, study-group, social, or lecture', () => {
        baseEvent.set('type', 'party');
        return baseEvent.save()
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'Type must be one of ["workshop", "course", "hack-night", "study-group", "social", "lecture"]', 'Incorrect error message for valid type. Received: ' + fieldError.message);
                });
            })
            .then(() => {
                assert.fail('Should not permit a type that is not workshop, course, hack-night, study-group, social, or lecture');
            });
    });
});
*/