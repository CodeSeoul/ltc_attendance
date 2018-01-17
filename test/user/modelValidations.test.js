require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const User = require('../../models/User').User;
const assert = require('assert');

describe('User modelValidations', () => {

    let joe;
    // TODO: test setting required values to null

    beforeEach(() => {
        return new User({
            username: 'joe',
            email: 'mail@mail.com',
            password: 'mypass',
            level: 'student'
        }).save()
            .then((savedJoe) => {
                joe = savedJoe;
            });
    });

    afterEach(() => {
        return knex('user').truncate()
            .then(() => {
                return knex('check_in').truncate();
            });
    });

    it('Should require unique email', () => {
        return new User({username: 'jane', email: 'mail@mail.com', password: 'otherpass', level: 'student'})
            .save()
            .then(() => {
                assert.fail('Should not allow saving a duplicate email');
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The email address is already in use', 'Incorrect error message for duplicate email. Received: ' + fieldError.message);
                });
            });
    });

    it('Should require valid email', () => {
        return new User({
            username: 'jane',
            email: 'mm.',
            password: 'lol',
            level: 'student'
        }).save()
            .then(() => {
                assert.fail('Should not permit an invalid email address');
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The email must be a valid email address');
                });
            });

    });

    it('Should require an email no more than 128 characters', () => {
        joe.set('email', 'mm@' + 'l'.repeat(125) + '.com');
        return joe.save()
            .then(() => {
                assert.fail('Should not permit an email longer than 128 characters');
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The email must not exceed 128 characters long', 'Incorrect error message for email > 128 characters. Received: ' + fieldError.message);
                });
            });

    });

    it('Should require name to be more than 2 chars', () => {
        joe.set('name', 'jo');
        return joe.save()
            .then(() => {
                assert.fail('Should not permit a name with fewer than 3 characters');
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The name must be at least 3 characters long', 'Incorrect error message for name > 2 characters. Received: ' + fieldError.message);
                });
            });
    });

    it('Should require name to be no more than 100 chars', () => {
        joe.set('name', 'j'.repeat(101));
        return joe.save()
            .then(() => {
                assert.fail('Should not permit a name with more than 100 characters');
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The name must not exceed 100 characters long', 'Incorrect error message for name <= 100 characters. Received: ' + fieldError.message);
                });
            });
    });

    it('Should require username to be more than 2 chars', () => {
        joe.set('username', 'jo');
        return joe.save()
            .then(() => {
                assert.fail('Should not permit a username with fewer than 3 characters');
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The username must be at least 3 characters long', 'Incorrect error message for username > 2 characters.  Received: ' + fieldError.message);
                });
            });
    });

    it('Should require username to be no more than 100 chars', () => {
        joe.set('username', 'j'.repeat(101));
        return joe.save()
            .then(() => {
                assert.fail('Should not permit a username with more than 100 characters');
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The username must not exceed 100 characters long', 'Incorrect error message for username <= 100 characters. Received: ' + fieldError.message);
                });
            });
    });

    it('Should require Description to be no more than 1000 chars', () => {
        joe.set('description', 'j'.repeat(1001));
        return joe.save()
            .then(() => {
                assert.fail('Should not permit a description with more than 1000 characters');

            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The description must not exceed 1000 characters long', 'Incorrect error message for description <= 1000 characters. Received: ' + fieldError.message);
                });

            });
    });

    it('Should require Hometown to be no more than 100 chars', () => {
        joe.set('hometown', 'j'.repeat(101));
        return joe.save()
            .then(() => {
                assert.fail('Should not permit a hometown with more than 100 characters');
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The hometown must not exceed 100 characters long', 'Incorrect error message for hometown <= 100 characters. Received: ' + fieldError.message);
                });

            });
    });

    it('Should require valid level', () => {
        joe.set('level', 'dragon');
        return joe.save()
            .then(() => {
                assert.fail('Should not permit a level that is not student or admin');
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'The level must be one of ["student", "admin"]', 'Incorrect error message for level being student or admin. Received: ' + fieldError.message);
                });
            });
    });

    it('Should require valid Website url', () => {
        joe.set('website', 'roflcopters');
        return joe.save()
            .then(() => {
                assert.fail('Should not permit a web address that is invalid');
            })
            .catch(err => {
                assert(err.keys().length === 1);
                err.each(fieldError => {
                    assert(fieldError.message === 'Validation for website did not pass', 'Incorrect message for web address being an invalid format. Received: ' + fieldError.message);
                });
            });
    });

});