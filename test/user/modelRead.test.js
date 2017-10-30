const User = require('../../models/User');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('User modelRead', () => {

    it('Should find a User record by _id', (done) => {
        const joe = new User({})
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(String(result._id) === String(joe._id));
                done();
            });
    });
});
