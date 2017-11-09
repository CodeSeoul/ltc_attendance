require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const assert = require('assert');

describe('User modelDestroy', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            username: 'joe',
            password: 'mypass'
        });
        joe.save()
            .then(() => done())
            .catch(err => done(err));
    });
    afterEach((done) => {
        knex('user').truncate()
            .then(() => knex('event').truncate())
            .then(() => done())
            .catch(err => done(err))
    });

    it('Should destroy User record', (done) => {
        const jane = new User({
            username: 'jane',
            password: 'otherpass'
        });
        jane.save()
            .then(() => new User({id: joe.id}.destroy()))
            .then(() => User.fetchAll())
            .then(results => {
                assert(results.length === 1);
                assert(results[0].id === jane.id);
                done()
            })
            .catch(err => done(err));
    });
});
