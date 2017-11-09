require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Event = require('../../models/Event').Event;
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
            .then(() => knex('user').truncate())
            .then(() => done())
            .catch(err => done(err));
    });

    it('Should update Title', (done) => {
        baseEvent.title = 'ruby';
        baseEvent.save()
            .then(() => Event.where({id: baseEvent.id}).fetch())
            .then(result => {
                assert(result.title === 'ruby');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Description', (done) => {
        baseEvent.description = 'beginner ruby';
        baseEvent.save()
            .then(() => Event.where({id: baseEvent.id}).fetch())
            .then(result => {
                assert(result.description === 'beginner ruby');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Type', (done) => {
        baseEvent.type = 'Hack Night';
        baseEvent.save()
            .then(() => Event.where({id: baseEvent.id}).fetch())
            .then(result => {
                assert(result.type === 'Hack Night');
                done();
            })
            .catch(err => done(err));
    });
});
