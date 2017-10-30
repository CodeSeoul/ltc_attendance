const User = require('../../models/User');
const Course = require('../../models/Course');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('User modelDestroy', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({});
        joe.save()
            .then(() => done());
    });
    afterEach((done) => {
        User.collection.drop();
        Course.collection.drop();
        done();
    });

    it('Should destroy User recorde', (done) => {
        const jane = new User({})
        jane.save()
            .then(() => User.remove({_id: joe._id}))
            .then(() => User.find({}))
            .then((results) => {
                assert(results.length === 1);
                assert(String(results[0]._id) === String(jane._id));
                done()
            });
    });
});
