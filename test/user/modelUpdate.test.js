const User = require('../../models/User');
const CheckIn = require('../../models/checkIn');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('User modelUpdate', () => {
    let joe;

    beforeEach((done) => {
        const firstCheckIn = new CheckIn({});
        joe = new User({
            name: 'joe',
            email: 'mail@mail.com',
            checkIns: [{_id: firstCheckIn._id}]
        });
        joe.save()
            .then(() => done());
    });

    afterEach((done) => {
        User.collection.drop();
        CheckIn.collection.drop();
        done();
    });

    it('Should update Name', (done) => {
        joe.name = 'jane';
        joe.save()
            .then(() => User.findOne({_id: joe._id}))
            .then((result) => {
                assert(result.name === 'jane');
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
