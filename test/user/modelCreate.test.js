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
            .then(() => knex('check_in').truncate())
            .then(() => done())
            .catch(err => done(err));
    });

    it('Should create a new User record', (done) => {
        assert(!joe.isNew);
        done()
    });

    it('Should be able to set Username', (done) => {
        joe.username = 'joe';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then(result => {
                assert(result.username === 'joe');
                done()
            })
            .catch(err => done(err));
    });

    it('Should be able to set Name', (done) => {
        joe.name = 'joe billy bob';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then(result => {
                assert(result.name === 'joe billy bob');
                done()
            })
            .catch(err => done(err));
    });

    it('Should be able to set Description', (done) => {
        joe.description = 'I like to surf';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then(result => {
                assert(result.description === 'I like to surf');
                done()
            })
            .catch(err => done(err));
    });

    it('Should be able to set Email', (done) => {
        joe.email = 'mail@mail.com';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then(result => {
                assert(result.email === 'mail@mail.com');
                done()
            })
            .catch(err => done(err));
    });

    it('Should be able to set Hometown', (done) => {
        joe.hometown = 'Detroit';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then(result => {
                assert(result.hometown === 'Detroit');
                done()
            })
            .catch(err => done(err));
    });

    it('Should be able to set Website', (done) => {
        joe.website = 'mail.com';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then(result => {
                assert(result.website === 'mail.com');
                done()
            })
            .catch(err => done(err));
    });

    it('Should set Level to student by default', (done) => {
        assert(joe.level === 'student');
        done()
    });

    it('Should set Hometown to hometown by default', (done) => {
        assert(joe.hometown === 'hometown');
        done()
    });

    it('Should be able to set CheckIns', (done) => {
        const firstCheckIn = new CheckIn({});
        joe.checkIns.push(firstCheckIn);
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then(result => {
                assert(String(result.checkIns) === String(firstCheckIn.id));
                done()
            })
            .catch(err => done(err));
    });
});
