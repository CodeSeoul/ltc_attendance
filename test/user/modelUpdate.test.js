require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const CheckIn = require('../../models/checkIn').CheckIn;
const Event = require('../../models/Event').Event;
const assert = require('assert');

describe('User modelUpdate', () => {
    let joe;

    beforeEach(() => {
        return new User({
            username: 'joe',
            email: 'mail@mail.com',
            password: 'mypass',
            level: 'student'
        }).save()
            .then(savedJoe => {
                joe = savedJoe;
                return new Event({
                    title: 'User Test Event',
                    description: 'roflcopters and lollerskates',
                    type: 'Workshop',
                    created_by: joe
                }).save()
                    .then(event => {
                        return new CheckIn().save({
                            'user_id': joe.get('id'),
                            'event_id': event.get('id')
                        })
                    })
            });
    });

    afterEach(() => {
        return knex('check_in').truncate()
            .then(() => {
                return knex('user').truncate()
            })
            .then(() => {
                return knex('event').truncate()
            });
    });

    it('Should update Username', () => {
        joe.set('username', 'jane');
        return joe.save()
            .then(user => {
                assert(user.get('username') === 'jane', `Username should be "jane" but got "${user.get('username')}"`);
            });
    });

    it('Should update Name', () => {
        joe.set('name', 'jane smith');
        return joe.save()
            .then(user => {
                assert(user.get('name') === 'jane smith', `Name should be "jane smith" but got "${user.get('name')}"`);
            });
    });

    it('Should update Email', () => {
        joe.set('email', 'm@m.com');
        return joe.save()
            .then(user => {
                assert(user.get('email') === 'm@m.com', `Email should be "m@m.com" but got "${user.get('email')}"`);
            });
    });

    it('Should update Level', () => {
        joe.set('level', 'admin');
        console.log('joe after set: ' + JSON.stringify(joe));
        return joe.save()
            .then(user => {
                console.log('joe after save: ' + JSON.stringify(user));
                assert(user.get('level') === 'admin', `Level should be "admin" but got "${user.get('level')}"`);
            });
    });

    it('Should update Website', () => {
        joe.set('website', 'http://www.github.com');
        return joe.save()
            .then(user => {
                assert(user.get('website') === 'http://www.github.com', `Website should be "http://www.github.com" but got "${user.get('website')}"`);
            });
    });

    it('Should update Hometown', () => {
        joe.set('hometown', 'Capetown, South Africa');
        return joe.save()
            .then(user => {
                assert(user.get('hometown') === 'Capetown, South Africa', `Hometown should be "Capetown, South Africa" but got "${user.get('hometown')}"`);
            });
    });

    it('Should update Description', () => {
        joe.set('description', 'I like to play guitar');
        return joe.save()
            .then(user => {
                assert(user.get('description') === 'I like to play guitar', `Description should be "I like to play guitar" but got "${user.get('description')}"`);
            });
    });

    it('Should update CheckIns', () => {
        return joe.checkIns().create({})
            .then(checkIn => {
                return checkIn.related('user').fetch({withRelated: 'checkIns'});
            })
            .then(checkedInUser => {
                assert(checkedInUser.get('id') === joe.get('id'), `checkedInUser should have the same ID as original user but checkInUser is "${checkedInUser.get('id')}" and user is "${joe.get('id')}"`);
                assert(checkedInUser.related('checkIns').length === 2, `The count of checkIns should be 2 but got "${checkedInUser.related('checkIns').length}"`);
            });
    });
});
