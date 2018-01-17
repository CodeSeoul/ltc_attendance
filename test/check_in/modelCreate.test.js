require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Event = require('../../models/Event').Event;
const User = require('../../models/User').User;
const CheckIn = require('../../models/checkIn').CheckIn;
const CheckIt = require('checkit');
const moment = require('moment');
const assert = require('assert');

describe('CheckIn modelCreate', () => {

    let baseEvent;
    let joe;

    beforeEach(() => {
        joe = new User({
            username: 'joe',
            password: 'mypass',
            email: 'fake@fake.com',
            level: 'student'
        });

        baseEvent = new Event({
            title: 'Test Event',
            description: 'the best event evar',
            type: 'workshop'
        });

        return joe.save()
            .then(savedUser => {
                joe = savedUser;
                baseEvent.createdBy = joe;
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
            })
            .then(() => {
                return knex('check_in').truncate();
            });
    });

    it('Should create a new check_in record', () => {
        return new CheckIn({
            user_id: joe.get('id'),
            event_id: baseEvent.get('id')
        })
            .save()
            .then(savedCheckIn => {
                return assert(!savedCheckIn.isNew());
            });
    });

    it('Should set correct user ID on new check_in', () => {
        return new CheckIn()
            .save({
                user_id: joe.get('id'),
                event_id: baseEvent.get('id')
            })
            .then(savedCheckIn => {
                return assert(savedCheckIn.get('user_id') === joe.get('id'));
            });
    });

    it('Should set correct user ID on new check_in', () => {
        return new CheckIn()
            .save({
                user_id: joe.get('id'),
                event_id: baseEvent.get('id')
            })
            .then(savedCheckIn => {
                return assert(savedCheckIn.get('event_id') === baseEvent.get('id'));
            });
    });
});
