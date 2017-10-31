const User = require('../../models/User');
const CheckIn = require('../../models/checkIn');
const assert = require('assert');

describe('User modelUpdate', () => {
    let joe;

    beforeEach((done) => {
        const firstCheckIn = new CheckIn({});
        joe = new User({
            username: 'joe',
            email: 'mail@mail.com',
            password: 'mypass',
            checkIns: [{_id: firstCheckIn._id}]
        });
        joe.save()
            .then(() => done())
            .catch(done);
    });

    afterEach((done) => {
        User.collection.drop();
        CheckIn.collection.drop();
        done();
    });

    it('Should update Username', (done) => {
        joe.username = 'jane';
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(result.username === 'jane');
                done();
            });
    });

    it('Should update Name', (done) => {
        joe.name = 'jane smith';
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(result.name === 'jane smith');
                done();
            });
    });

    it('Should update Email', (done) => {
        joe.email = 'm@m.com';
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(result.email === 'm@m.com');
                done();
            });
    });

    it('Should update Level', (done) => {
        joe.level = 'instructor';
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(result.level === 'instructor');
                done();
            });
    });

    it('Should update Website', (done) => {
        joe.website = 'www.github.com';
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(result.website === 'www.github.com');
                done();
            });
    });

    it('Should update Hometown', (done) => {
        joe.hometown = 'Capetown, South Africa';
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(result.hometown === 'Capetown, South Africa');
                done();
            });
    });

    it('Should update Description', (done) => {
        joe.description = 'I like to play guitar';
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(result.description === 'I like to play guitar');
                done();
            });
    });

    it('Should update CheckIns', (done) => {
        const checkIn2 = new CheckIn({});
        joe.checkIns = [{_id: checkIn2._id}];
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(String(result.checkIns) === String(checkIn2._id));
                done();
            });
    });
});
