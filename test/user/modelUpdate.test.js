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
            password: 'mypass',
            level: 'student'
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

        User.where({username: 'joe'}).fetch()
            .then(user => {
                return user.save({username: 'jane'});
            })
            .then(user => {
                assert(user.get('username') === 'jane');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Name', (done) => {

        User.where({username: 'joe'}).fetch()
            .then(user => {
                return user.save({name: 'jane smith'});
            })
            .then(user => {
                assert(user.get('name') === 'jane smith');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Email', (done) => {

        User.where({username: 'joe'}).fetch()
            .then(user => {
                return user.save({email: 'm@m.com'});
            })
            .then(user => {
                assert(user.get('email') === 'm@m.com');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Level', (done) => {

        User.where({username: 'joe'}).fetch()
            .then(user => {
                return user.save({level: 'instructor'});
            })
            .then(user => {
                assert(user.get('level') === 'instructor');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Website', (done) => {

        User.where({username: 'joe'}).fetch()
            .then(user => {
                return user.save({website: 'www.github.com'});
            })
            .then(user => {
                assert(user.get('website') === 'www.github.com');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Hometown', (done) => {

        User.where({username: 'joe'}).fetch()
            .then(user => {
                return user.save({hometown: 'Capetown, South Africa'});
            })
            .then(user => {
                assert(user.get('hometown') === 'Capetown, South Africa');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update Description', (done) => {

        User.where({username: 'joe'}).fetch()
            .then(user => {
                return user.save({description: 'I like to play guitar'});
            })
            .then(user => {
                assert(user.get('description') === 'I like to play guitar');
                done();
            })
            .catch(err => done(err));
    });

    it('Should update CheckIns', (done) => {
        //const user = User.forge

        User.where({username: 'joe'}).fetch({withRelated: 'checkIns'})
            .then(user => {
                return user.checkIns().create({})
                    .then(checkIn => {
                        return checkIn.related('user').fetch({withRelated: 'checkIns'});
                    })
                    .then(checkedInUser => {
                        assert(checkedInUser.get('id') === user.get('id'));
                        assert(checkedInUser.related('checkIns').length === 2);
                        done();
                    })
                    .catch(err => done(err));
            })
            .catch(err => done(err));
    });
});
