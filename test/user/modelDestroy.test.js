const User = require('../../models/User');
const Course = require('../../models/Course');
const assert = require('assert');

describe('User modelDestroy', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            username: 'joe',
            password: 'mypass'
        });
        joe.save()
            .then(() => done())
            .catch(done);
    });
    afterEach((done) => {
        User.collection.drop();
        Course.collection.drop();
        done();
    });

    it('Should destroy User record', (done) => {
        const jane = new User({
            username: 'jane',
            password: 'otherpass'
        });
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
