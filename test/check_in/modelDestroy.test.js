require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const Event = require('../../models/Event').Event;
const CheckIn = require('../../models/checkIn').CheckIn;
const assert = require('assert');

describe('CheckIn modelDestroy', () => {

    let baseCheckIn;

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
                    created_by: savedUser.get('id')
                }).save()
                    .then(savedEvent => {
                        return new CheckIn({
                            user_id: savedUser.get('id'),
                            event_id: savedEvent.get('id')
                        }).save();
                    })
                    .then(savedCheckIn => {
                        baseCheckIn = savedCheckIn;
                    });
            });
    });
    afterEach(() => {
        return knex('event').truncate()
            .then(() => {
                return knex('user').truncate();
            })
            .then(() => {
                return knex('check_in').truncate();
            });
    });

    it('Should destroy check_in record', () => {
        return baseCheckIn.destroy()
            .then(() => CheckIn.forge().fetchAll())
            .then(results => {
                assert(results.length === 0);
            });
    });
});
