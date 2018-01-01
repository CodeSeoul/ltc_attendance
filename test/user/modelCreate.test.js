require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const CheckIn = require('../../models/checkIn').CheckIn;
const CheckIt = require('checkit');
const assert = require('assert');

describe('User modelCreate', () => {

    let joe;

    beforeEach(() => {
        joe = new User({
            username: 'joe',
            password: 'mypass',
            email: 'fake@fake.com',
            level: 'student'
        });
        return joe.save()
            .then((savedJoe) => {
                joe = savedJoe;
            })
            .catch(err => {
                if (err instanceof CheckIt.Error) {
                    err.each((fieldError) => {
                        console.error(fieldError.message);
                    });
                }
                return err;
            });
    });

    afterEach(() => {
        knex('user').truncate()
            .then(() => {
                return knex('check_in').truncate();
            });
    });

    it('Should create a new User record', () => {
        assert(!joe.isNew(), 'Expected user to be not new, but user was new');
    });

    it('Should be able to set Username', () => {
        joe.set('username', 'joe');
        return joe.save()
            .then(result => {
                assert(result.get('username') === 'joe', `Expected user's username to be "joe" but got "${result.get('username')}"`);
            });
    });

    it('Should hash password', () => {
        joe.set('password', 'newpass');
        return joe.save()
            .then(result => {
                assert(result.get('password') !== 'newpass');
                return result.comparePassword('newpass');
            })
            .then(result => {
                assert(result, 'Expected comparePassword to return true but got false');
            })
    });

    it('Should be able to set Name', () => {
        joe.set('name', 'joe billy bob');
        return joe.save()
            .then(result => {
                assert(result.get('name') === 'joe billy bob', `Expected user's name to be "joe billy bob" but got "${result.get('name')}"`);
            });
    });

    it('Should be able to set Description', () => {
        joe.set('description', 'I like to surf');
        return joe.save()
            .then(result => {
                assert(result.get('description') === 'I like to surf', `Expected user's description to be "I like to surf" but got "${result.get('description')}"`);
            });
    });

    it('Should be able to set Email', () => {
        joe.set('email', 'mail@mail.com');
        return joe.save()
            .then(result => {
                assert(result.get('email') === 'mail@mail.com', `Expected user's email to be "mail@mail.com" but user's email was "${result.get('email')}"`);
            });
    });

    it('Should be able to set Hometown', () => {
        joe.set('hometown', 'Detroit');
        return joe.save()
            .then(result => {
                assert(result.get('hometown') === 'Detroit', `Expected user's hometown to be "Detroit" but user's hometown was "${result.get('hometown')}"`);
            });
    });

    it('Should be able to set Website', () => {
        joe.set('website', 'http://mail.com');
        return joe.save()
            .then(result => {
                assert(result.get('website') === 'http://mail.com', `Expected user's website to be "http://mail.com" but user's website was "${result.get('website')}"`);
            });
    });

    it('Should set Level to student by default', () => {
        assert(joe.get('level') === 'student', `Expected user's level to default to "student" but user's level was "${joe.get('level')}"`);
    });

    it('Should be able to set CheckIns', () => {
        const firstCheckIn = new CheckIn();
        return firstCheckIn.save()
            .then(savedCheckIn => {
                return joe.checkIns().create(savedCheckIn);
            })
            .then(() => User.where({id: joe.get('id')}).fetch({withRelated: 'checkIns'}))
            .then(result => {
                assert(result.related('checkIns').length === 1);
                assert(result.related('checkIns').at(0).get('id') === firstCheckIn.get('id'), `Expected user's first checkIn ID to match firstCheckIn but user's checkIn had ID "${result.related('checkIns').at(0).get('id')}" and firstCheckIn had ID "${firstCheckIn.get('id')}"`);
            });
    });
});
