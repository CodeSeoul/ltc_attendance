require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const CheckIn = require('../../models/checkIn').CheckIn;
const Event = require('../../models/checkIn').Event;
const assert = require('assert');

describe('User modelUpdate', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            username: 'joe',
            email: 'mail@mail.com',
            password: 'mypass'
        });
        joe.save()
            .then(user => {
                new Event({
                    title: 'User Test Event',
                    description: 'roflcopters and lollerskates',
                    type: 'Workshop'
                }).save()
                    .then(event => {
                        return new CheckIn().save({
                            'userid': user.id,
                            'eventid': event.id
                        });
                    })
                    .then(checkIn => {
                        user.checkIns.add(checkIn)
                    })
                    .catch(err => done(err));
            })
            .then(done())
            .catch(err => done(err));
    });

    afterEach((done) => {
        knex('check_in').truncate()
            .then(knex('user').truncate())
            .then(done())
            .catch(err => done(err));
    });

    it('Should update Username', (done) => {
        joe.username = 'jane';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then((result) => {
                assert(result.username === 'jane');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Name', (done) => {
        joe.name = 'jane smith';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then((result) => {
                assert(result.name === 'jane smith');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Email', (done) => {
        joe.email = 'm@m.com';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then((result) => {
                assert(result.email === 'm@m.com');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Level', (done) => {
        joe.level = 'instructor';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then((result) => {
                assert(result.level === 'instructor');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Website', (done) => {
        joe.website = 'www.github.com';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then((result) => {
                assert(result.website === 'www.github.com');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Hometown', (done) => {
        joe.hometown = 'Capetown, South Africa';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then((result) => {
                assert(result.hometown === 'Capetown, South Africa');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Description', (done) => {
        joe.description = 'I like to play guitar';
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then((result) => {
                assert(result.description === 'I like to play guitar');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update CheckIns', (done) => {
        const checkIn2 = new CheckIn({});
        joe.checkIns = [{id: checkIn2.id}];
        joe.save()
            .then(() => User.where({id: joe.id}).fetch())
            .then((result) => {
                assert(String(result.checkIns) === String(checkIn2.id));
                done();
            })
            .catch(err => done(err));
    });
});
