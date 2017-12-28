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
                done();
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The email must be a valid email address');
                });
                done();
            });

    });

    it('Should require an email no more than 128 characters', (done) => {
        joe.set('email', 'mm.' + 'l'.repeat(125) + '.com',);
        joe.save()
            .then(() => {
                assert.fail('Should not permit an email longer than 128 characters');
                done();
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The email must be no more than 128 characters');
                });
                done();
            });

    });

    it('Should require name to be more than 2 chars', (done) => {
        joe.set('name', 'jo');
        joe.save()
            .then(() => {
                assert.fail('Should not permit a name with 2 or fewer characters');
                done();
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The name should be more than 2 characters');
                    done();
                });
                done();
            });
    });

    it('Should require name to be no more than 100 chars', (done) => {
        joe.set('name', 'j'.repeat(101));
        joe.save()
            .then(() => {
                assert.fail('Should not permit a name with more than 100 characters');
                done();
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The name should be no more than 100 characters');
                    done();
                });
                done();
            });
    });

    it('Should require username to be more than 2 chars', (done) => {
        joe.set('username', 'jo');
        joe.save()
            .then(() => {
                assert.fail('Should not permit a username with 2 or fewer characters');
                done();
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The username should be more than 2 characters');
                    done();
                });
                done();
            });
    });

    it('Should require username to be no more than 100 chars', (done) => {
        joe.set('username', 'j'.repeat(101));
        joe.save()
            .then(() => {
                assert.fail('Should not permit a username with more than 100 characters');
                done();
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The username should be no more than 100 characters');
                    done();
                });
                done();
            });
    });

    it('Should require Description to be no more than 1000 chars', (done) => {
        joe.set('description', 'j'.repeat(1001));
        joe.save()
            .then(() => {
                assert.fail('Should not permit a description with more than 1000 characters');
                done();
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The description should be no more than 1000 characters');
                    done();
                });
                done();
            });
    });

    it('Should require Hometown to be no more than 100 chars', (done) => {
        joe.set('hometown', 'j'.repeat(101));
        joe.save()
            .then(() => {
                assert.fail('Should not permit a hometown with more than 100 characters');
                done();
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The hometown should be no more than 100 characters');
                    done();
                });
                done();
            });
    });

    it('Should require valid level', (done) => {
        joe.set('level', 'dragon');
        joe.save()
            .then(() => {
                assert.fail('Should not permit a hometown with more than 100 characters');
                done();
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The hometown should be no more than 100 characters');
                    done();
                });
                done();
            });
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