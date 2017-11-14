require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const CheckIn = require('../../models/checkIn').CheckIn;
const assert = require('assert');

describe('User modelCreate', () => {

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
            .then(() => {
                return knex('check_in').truncate();
            })
            .then(() => done())
            .catch(err => done(err));
    });

    it('Should create a new User record', (done) => {
        assert(!joe.isNew());
        done()
    });

    it('Should be able to set Username', (done) => {
        joe.save({username: 'joe'})
            .then(result => {
                assert(result.get('username') === 'joe');
                done()
            })
            .catch(err => done(err));
    });

    it('Should hash password', (done) => {
        joe.save({password: 'newpass'})
            .then(result => {
                assert(result.get('password') !== 'newpass');
                return result.comparePassword('newpass');
            })
            .then(result => {
                assert(result);
                done()
            })
            .catch(err => done(err));
    });

    it('Should be able to set Name', (done) => {
        joe.save({name: 'joe billy bob'})
            .then(result => {
                assert(result.get('name') === 'joe billy bob');
                done()
            })
            .catch(err => done(err));
    });

    it('Should be able to set Description', (done) => {
        joe.save({description: 'I like to surf'})
            .then(result => {
                assert(result.get('description') === 'I like to surf');
                done()
            })
            .catch(err => done(err));
    });

    it('Should be able to set Email', (done) => {
        joe.save({email: 'mail@mail.com'})
            .then(result => {
                assert(result.get('email') === 'mail@mail.com');
                done()
            })
            .catch(err => done(err));
    });

    it('Should be able to set Hometown', (done) => {
        joe.save({hometown: 'Detroit'})
            .then(result => {
                assert(result.get('hometown') === 'Detroit');
                done()
            })
            .catch(err => done(err));
    });

    it('Should be able to set Website', (done) => {
        joe.save({website: 'mail.com'})
            .then(result => {
                assert(result.get('website') === 'mail.com');
                done()
            })
            .catch(err => done(err));
    });

    it('Should set Level to student by default', (done) => {
        assert(joe.get('level') === 'student');
        done()
    });

    it('Should be able to set CheckIns', (done) => {
        const firstCheckIn = new CheckIn();
        firstCheckIn.save()
            .then(savedCheckIn => {
                return joe.checkIns().create(savedCheckIn);
            })
            .then(updatedUser => User.where({id: joe.get('id')}).fetch({withRelated: 'checkIns'}))
            .then(result => {
                assert(result.related('checkIns').length === 1);
                assert(result.related('checkIns').at(0).get('id') === firstCheckIn.get('id'));
                done()
            })
            .catch(err => done(err));
    });
});
