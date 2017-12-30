require('../test_helper.test');
const User = require('../../models/User').User;
const knex = require('../../config/bookshelf').knex;
const assert = require('assert');

describe('User modelRead', () => {

    afterEach(() => {
        return knex('user').truncate();
    });

    it('Should find a User record by id', () => {
        let joe = new User({
            username: 'joe',
            password: 'mypass',
            email: 'fake@fake.com',
            level: 'student'
        });
        return joe.save()
            .then((savedJoe) => {
                joe = savedJoe;
                return User.where({id: joe.get('id')}).fetch();
            })
            .then(result => {
                assert(String(result.get('id')) === String(joe.get('id')));
            })
    });
});
