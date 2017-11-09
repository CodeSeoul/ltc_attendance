require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Event = require('../../models/Event').Event;
const assert = require('assert');

describe('Event modelDestroy', () => {
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

    it('Should destroy event record', (done) => {
        const ruby = new Event({title: 'ruby'});
        ruby.save()
            .then(() => {
                return Event.where({title: 'Test Event'}).fetch()
            })
            .then(event => {
                return event.destroy()
            })
            .then(() => Event.forge().fetchAll())
            .then(results => {
                assert(results.length === 1);
                assert(results.at(0).get('title') === 'ruby');
                done()
            })
            .catch(err => done(err));
    });
});
