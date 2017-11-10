require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const CheckIn = require('../../models/checkIn').CheckIn;
const Event = require('../../models/Event').Event;
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
                            'user_id': user.get('id'),
                            'event_id': event.get('id')
                        })
                            .then(() => {
                                done();
                            });
                    })
                    .catch(err => done(err));
            })
            .catch(err => done(err));
    });

    afterEach((done) => {
        knex('check_in').truncate()
            .then(() => {
                return knex('user').truncate()
            })
            .then(() => {
                return knex('event').truncate()
            })
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
        //const user = User.forge

        User.where({username: 'joe'}).fetch({withRelated: 'checkIns'})
            .then(user => {
                return user.checkIns().create({})
                    .then(newCheckIn => {
                        // const checkInUser = newCheckIn.user();
                        // const relatedUser = newCheckIn.related('user');
                        // assert(newCheckIn.user().get('id') === user.get('id'));
                        // return newCheckIn.user();
                        return newCheckIn.refresh({withRelated: 'user'});
                    })
                    .then(updatedCheckIn => {
                        assert(updatedCheckIn.user().get('id') === user.get('id'));
                        assert(updatedCheckIn.user().checkIns().length === 2);
                        return updatedCheckIn.user();
                    })
                    .then(user => {
                        assert(user.checkIns().length === 2);
                        done();
                    })
                    .catch(err => done(err));
            })
            .catch(err => done(err));
    });
});
