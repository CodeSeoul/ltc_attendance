require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const assert = require('assert');

describe('User modelValidations', () => {

    let joe;

    beforeEach((done) => {
        joe = new User({
            username: 'joe',
            email: 'mail@mail.com',
            password: 'mypass',
            level: 'student'
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

    it('Should require unique email', (done) => {
        new User({username: 'jane', email: 'mail@mail.com', password: 'otherpass', level: 'student'})
            .save()
            .then(() => {
                assert.fail('Should not allow saving a duplicate email');
                done()
            })
            .catch(err => {
                console.log('err: ' + err);
                /*const message = err.errors.email.message;
                assert(message.includes('to be unique'));*/
                done()
            });
    });

    it('Should require valid email', (done) => {
        new User({
            username: 'jane',
            email: 'mm.',
            password: 'lol',
            level: 'student'
        }).save()
            .then(() => {
                assert.fail('Should not permit an invalid email address');
                done()
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The email must be a valid email address');
                });
                done()
            });

    });

    it('Should require name to be more than 2 chars', (done) => {
        const jo = new User({
            name: 'jo'
        });
        const validationResult = jo.validateSync();
        const message = validationResult.errors.name.message;
        assert(message === 'Name must be valid length');
        done()
    });

    it('Should require name to be less then 100 chars', (done) => {
        const jo = new User({
            name: 'j'.repeat(100)
        });
        const validationResult = jo.validateSync();
        const message = validationResult.errors.name.message;
        assert(message === 'Name must be valid length');
        done()
    });

    it('Should require username to be more than 2 chars', (done) => {
        const jo = new User({
            username: 'jo',
            email: 'jo@mail.com'
        });
        const validationResult = jo.validateSync();
        const message = validationResult.errors.username.message;
        assert(message === 'Username must be valid length');
        done()
    });

    it('Should require username to be less then 100 chars', (done) => {
        const jo = new User({
            username: 'j'.repeat(100),
            email: 'jo@mail.com'
        });
        const validationResult = jo.validateSync();
        const message = validationResult.errors.username.message;
        assert(message === 'Username must be valid length');
        done()
    });

    it('Should require Description to be less then 1000 chars', (done) => {
        const joe = new User({
            username: 'joe',
            email: 'jo@mail.com',
            description: 'j'.repeat(1000)
        });
        const validationResult = joe.validateSync();
        const message = validationResult.errors.description.message;
        assert(message === 'Description must be less than 1000 characters');
        done()
    });

    it('Should require Hometown to be less then 100 chars', (done) => {
        const joe = new User({
            username: 'joe',
            email: 'jo@mail.com',
            hometown: 'j'.repeat(100)
        });
        const validationResult = joe.validateSync();
        const message = validationResult.errors.hometown.message;
        assert(message === 'Hometown must be less than 100 characters');
        done()
    });

    it('Should require valid level', (done) => {
        const joe = new User({
            level: 'dragon'
        });
        const validationResult = joe.validateSync();
        const {message} = validationResult.errors.level;
        assert(message.includes('not a valid enum'));
        done()
    });

    it('Should require valid Website url', (done) => {
        const jane = new User({
            username: 'jane',
            website: 'mm.'
        });
        const validationResult = jane.validateSync();
        const message = validationResult.errors.website.message;
        assert(message === 'Website must be valid url');
        done()
    });

});