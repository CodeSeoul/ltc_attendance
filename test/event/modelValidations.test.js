require('../test_helper.test');
const Event = require('../../models/event').Event;
const assert = require('assert');

// TODO: validations
/*
describe('Event model validations', () => {
    it('Should require title', (done) => {
        const ruby = new Event({username: undefined});
        const validationResult = ruby.validateSync();
        const message = validationResult.errors.title.message;
        assert(message === 'Title is required');
        done();
    });

    it('Should require title length more than 1 chars', (done) => {
        const ruby = new Event({
            title: 'r',
        });
        const validationResult = ruby.validateSync();
        const message = validationResult.errors.title.message;
        assert(message === 'Title must be valid length');
        done();
    });

    it('Should require title length less than 100 chars', (done) => {
        const ruby = new Event({
            title: 'r'.repeat(100),
        });
        const validationResult = ruby.validateSync();
        const message = validationResult.errors.title.message;
        assert(message === 'Title must be valid length');
        done();
    });

    it('Should require description length more than 2 chars', (done) => {
        const ruby = new Event({
            title: 'ruby',
            description: 'rr'
        });
        const validationResult = ruby.validateSync();
        const message = validationResult.errors.description.message;
        assert(message === 'Description must be valid length');
        done();
    });

    it('Should require description length less than 10000 chars', (done) => {
        const ruby = new Event({
            title: 'ruby',
            description: 'r'.repeat(10000)
        });
        const validationResult = ruby.validateSync();
        const message = validationResult.errors.description.message;
        assert(message === 'Description must be valid length');
        done();
    });
});
*/