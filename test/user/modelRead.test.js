require('../test_helper.test');
const User = require('../../models/User').User;
const assert = require('assert');

describe('User modelRead', () => {

    it('Should find a User record by _id', (done) => {
        const joe = new User({
            username: 'joe',
            password: 'mypass',
            email: 'fake@fake.com',
            level: 'student'
        });
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then(result => {
                assert(String(result.id) === String(joe.id));
                done();
            })
            .catch(err => done(err));
    });
});
