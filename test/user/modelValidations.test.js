const User = require('../../models/User');
const assert = require('assert');

describe('User modelValidations', () => {
    beforeEach((done) => {
        const joe = new User({
            name: 'joe',
            email: 'mail@mail.com',
            password: 'mypass'
        });
        joe.save()
            .then(() => done())
            .catch(done);
    });

    afterEach((done) => {
        User.collection.drop();
        done();
    });

    it('Should require unique email', (done) => {
        const jane = new User({name: 'jane', email: 'mail@mail.com', password: 'otherpass'})
            .save()
            .catch((err) => {
                const message = err.errors.email.message
                assert(message.includes('to be unique'))
                done();
            });
    });

    it('Should require valid email', (done) => {
        const jane = new User({
            name: 'jane',
            email: 'mm.'
        });
        const validationResult = jane.validateSync();
        const message = validationResult.errors.email.message;
        assert(message === 'Email must be valid');
        done()
    });

    it('Should require name to be more than 2 chars', (done) => {
        const jo = new User({
            name: 'jo',
            email: 'jo@mail.com'
        });
        const validationResult = jo.validateSync();
        const message = validationResult.errors.name.message;
        assert(message === 'Name must be valid length');
        done()
    });

    it('Should require name to be less then 100 chars', (done) => {
        const jo = new User({
            name: 'j'.repeat(100),
            email: 'jo@mail.com'
        });
        const validationResult = jo.validateSync();
        const message = validationResult.errors.name.message;
        assert(message === 'Name must be valid length');
        done()
    });

    it('Should require Description to be less then 1000 chars', (done) => {
        const joe = new User({
            name: 'joe',
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
            name: 'joe',
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
            name: 'jane',
            website: 'mm.'
        });
        const validationResult = jane.validateSync();
        const message = validationResult.errors.website.message;
        assert(message === 'Website must be valid url');
        done()
    });

});
