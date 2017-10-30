const User = require('../../models/User');
const Course = require('../../models/Course');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('User modelDestroy', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            name: 'joe',
            password: 'mypass'
        });
        joe.save()
            .then(() => done());
    });
    afterEach((done) => {
        User.collection.drop();
        Course.collection.drop();
        done();
    });

    it('Should destroy User record', (done) => {
        const jane = new User({
            name: 'jane',
            password: 'otherpass'
        })
        jane.save()
            .then(() => User.remove({_id: joe._id}))
            .then(() => User.find({}))
            .then((results) => {
                assert(results.length === 1);
                assert(String(results[0]._id) === String(jane._id));
                done()
            })
            .catch(done);
    });
});
