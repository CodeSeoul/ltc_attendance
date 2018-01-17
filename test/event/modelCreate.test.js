require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Event = require('../../models/Event').Event;
const User = require('../../models/User').User;
const CheckIt = require('checkit');
const moment = require('moment');
const assert = require('assert');

describe('Event modelCreate', () => {

    let baseEvent;
    let joe;

    beforeEach(() => {
        joe = new User({
            username: 'joe',
            password: 'mypass',
            email: 'fake@fake.com',
            level: 'student'
        });

        return joe.save()
            .then(savedUser => {
                joe = savedUser;
                baseEvent = new Event({
                    title: 'Test Event',
                    description: 'the best event evar',
                    type: 'workshop',
                    created_by: joe.get('id')
                });
                return baseEvent.save();
            })
            .then(savedBaseEvent => {
                baseEvent = savedBaseEvent;
            })
            .catch(err => {
                console.log(err);
                if (err instanceof CheckIt.Error) {
                    err.each((fieldError) => {
                        console.error(fieldError.message);
                    });
                }
            });
    });

    afterEach(() => {
        return knex('event').truncate()
            .then(() => {
                return knex('user').truncate()
            });
    });

    it('Should create a new Event record', () => {
        return assert(!baseEvent.isNew());
    });

    it('Should be able to set Event Description', () => {
        baseEvent.set('description', 'beginner sql');
        return baseEvent.save()
            .then(result => {
                assert(result.get('description') === 'beginner sql');
            });
    });

    it('Should be able to set Event Type', () => {
        baseEvent.set('type', 'workshop');
        return baseEvent.save()
            .then(() => {
                return Event.where({title: 'Test Event'}).fetch();
            })
            .then(result => {
                assert(result.get('type') === 'workshop');
            });
    });

    it('Should set created_at timestamp by default', () => {
        const createdAt = moment(baseEvent.get('created_at'), 'YYYY-MM-DD HH:mm:ss');
        assert(createdAt instanceof moment);
    });

    it('Should be able to add instructors', () => {
        return baseEvent.instructors()
            .attach([joe])
            .then(() => {
                return Event.where({title: 'Test Event'}).fetch({withRelated: 'instructors'});
            })
            .then(result => {
                assert(String(result.related('instructors').at(0).get('id')) === String(joe.get('id')), `Expected instructor ID to match joe ID. Instructor ID was "${result.instructors().get('id')}", and joe ID was "${joe.get('id')}"`);
            });
    });

});
