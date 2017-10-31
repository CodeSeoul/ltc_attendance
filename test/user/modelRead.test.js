const User = require('../../models/User');
const assert = require('assert');

describe('User modelRead', () => {

    it('Should find a User record by _id', (done) => {
        const joe = new User({
            username: 'joe',
            password: 'mypass'
        });
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(String(result._id) === String(joe._id));
                done();
            })
            .catch(done);
    });
});
