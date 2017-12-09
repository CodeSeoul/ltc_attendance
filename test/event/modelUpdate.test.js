require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Event = require('../../models/event').Event;
const assert = require('assert');

describe('Event modelUpdate', () => {
    let baseEvent;

    beforeEach((done) => {
        baseEvent = new Event({
            title: 'Test Event',
            description: 'beginner sql',
            type: 'Workshop'
        });
        baseEvent.save()
            .then(() => done())
            .catch(err => done(err));
    });

    afterEach((done) => {
        knex('event').truncate()
            .then(() => {
                return knex('user').truncate()
            })
            .then(() => done())
            .catch(err => done(err));
    });

    it('Should update Title', (done) => {
        baseEvent.set('title', 'ruby');
        baseEvent.save()
            .then(() => {
                return Event.where({id: baseEvent.get('id')}).fetch()
            })
            .then(result => {
                assert(result.get('title') === 'ruby');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Description', (done) => {
        baseEvent.set('description', 'beginner ruby');
        baseEvent.save()
            .then(() => {
                return Event.where({id: baseEvent.get('id')}).fetch()
            })
            .then(result => {
                assert(result.get('description') === 'beginner ruby');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Type', (done) => {
        baseEvent.set('type', 'Hack Night');
        baseEvent.save()
            .then(() => {
                return Event.where({id: baseEvent.get('id')}).fetch()
            })
            .then(result => {
                assert(result.get('type') === 'Hack Night');
                done();
            })
            .catch(err => done(err));
    });
});
