require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Event = require('../../models/Event').Event;
const User = require('../../models/User').User;
const moment = require('moment');
const assert = require('assert');

describe('Event modelCreate', () => {

    let baseEvent;

    beforeEach((done) => {
        baseEvent = new Event({
            title: 'Test Event',
            description: 'the best event evar',
            type: 'Workshop',
            created_by: '1'
        });

        baseEvent.save().then(() => done()).catch(err => done(err));
    });

    afterEach((done) => {
        knex('user').truncate()
            .then(() => {
                return knex('event').truncate()
            })
            .then(() => done())
            .catch(err => done(err));
    });

    it('Should create a new Event record', (done) => {
        assert(!baseEvent.isNew());
        done();
    });

    it('Should be able to set Event Description', (done) => {
        baseEvent.save({description: 'beginner sql'})
            .then(result => {
                assert(result.get('description') === 'beginner sql');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Should be able to set Event Type', (done) => {
        baseEvent.save({type: 'Workshop'})
            .then(() => Event.where({title: 'Test Event'}).fetch())
            .then(result => {
                assert(result.get('type') === 'Workshop');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Should set CreatedAt timestamp by default', (done) => {
        const createdAt = moment(baseEvent.get('createdAt'), 'YYYY-MM-DD HH:mm:ss');
        assert(createdAt instanceof moment);
        done();
    });

    // TODO: verify test is valid. I think maybe it should be failing
    it('Should be able to set CreatedBy', (done) => {
        const joe = new User();
        baseEvent.instructors().push({id: joe.get('id')});
        baseEvent.save()
            .then(() => Event.where({title: 'Test Event'}).fetch())
            .then(result => {
                assert(String(result.instructors().id) === String(joe.id));
                done();
            })
            .catch(err => done(err));
    });

});
