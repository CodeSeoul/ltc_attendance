require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const assert = require('assert');

describe('User modelDestroy', () => {
    let joe;

    beforeEach(() => {
        joe = new User({
            username: 'joe',
            password: 'mypass',
            email: 'rofl@copters.com',
            level: 'student'
        });
        return joe.save()
            .then((savedJoe) => {
                joe = savedJoe;
            });
    });
    afterEach(() => {
        return knex('user').truncate()
            .then(() => knex('event').truncate());
    });

    it('Should destroy User record', (done) => {
        const jane = new User({
            username: 'jane',
            password: 'otherpass',
            email: 'loller@sakes.com',
            level: 'student'
        });
        jane.save()
            .then(() => {
                return User.where({username: 'joe'}).fetch();
            })
            .then(user => {
                user.destroy();
            })
            .then(() => User.forge().fetchAll())
            .then(results => {
                assert(results.length === 1);
                assert(results.at(0).get('username') === 'jane');
                done();
            })
            .catch(err => done(err));
    });
});
