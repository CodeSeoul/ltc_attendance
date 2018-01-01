require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const Event = require('../../models/Event').Event;
const assert = require('assert');

describe('Event modelDestroy', () => {
    beforeEach(() => {
        return new User({
            username: 'joe',
            password: 'mypass',
            email: 'fake@fake.com',
            level: 'student'
        }).save()
            .then(savedUser => {
                return new Event({
                    title: 'Test Event',
                    description: 'we\'ll do some stuff!',
                    type: 'workshop',
                    created_by: savedUser
                }).save();
            });
    });
    afterEach(() => {
        return knex('event').truncate()
            .then(() => {
                return knex('user').truncate();
            });
    });

    it('Should destroy event record', () => {
        return new Event({title: 'ruby class'})
            .save()
            .then(() => {
                return Event.where({title: 'Test Event'}).fetch()
            })
            .then(event => {
                return event.destroy()
            })
            .then(() => Event.forge().fetchAll())
            .then(results => {
                assert(results.length === 1);
                assert(results.at(0).get('title') === 'ruby class');
            });
    });
});
