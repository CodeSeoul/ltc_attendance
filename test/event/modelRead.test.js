require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Event = require('../../models/event').Event;
const assert = require('assert');

describe('Event modelRead', () => {
    beforeEach((done) => {
        const baseEvent = new Event({title: 'Test Event'});
        baseEvent.save()
            .then(() => done())
            .catch(err => done(err));
    });
    afterEach((done) => {
        knex('event').truncate()
            .then(() => done())
            .catch(err => done(err));
    });

    it('Should find a Event by _id', (done) => {
        const baseEvent = new Event({title: 'Test Event'});
        baseEvent.save()
            .then(() => Event.where({id: baseEvent.id}).fetch())
            .then(result => {
                assert(result.id === baseEvent.id);
                done()
            })
            .catch(err => done(err));
    });

});
