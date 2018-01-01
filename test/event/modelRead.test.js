require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Event = require('../../models/Event').Event;
const User = require('../../models/User').User;
const assert = require('assert');

describe('Event modelRead', () => {
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
                    description: 'we\'ll do some stuff!',
                    type: 'workshop',
                    created_by: joe
                }).save()
                    .then(savedBaseEvent => {
                        baseEvent = savedBaseEvent;
                    });
            });
    });
    afterEach(() => {
        return knex('event').truncate()
            .then(() => {
                return knex('user').truncate();
            });
    });

    it('Should find a Event by _id', () => {
        return new Event({title: 'Test Event'})
            .save()
            .then(() => Event.where({id: baseEvent.get('id')}).fetch())
            .then(result => {
                assert(result.get('id') === baseEvent.get('id'));
            });
    });

});
