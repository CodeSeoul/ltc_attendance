const User = require('../../models/User');
const CheckIn = require('../../models/checkIn');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('User modelCreate', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({});
    joe.save()
      .then(() => done());
  });

  afterEach((done) => {
    User.collection.drop();
    CheckIn.collection.drop();
    done();
  });

  it('Should create a new User record', (done) => {
    assert(!joe.isNew);
    done()
  });

  it('Should be able to set Name', (done) => {
    joe.name = 'joe';
    joe.save()
      .then(() => User.findOne({_id: joe._id}))
      .then((result) => {
        assert(result.name === 'joe');
        done()
      })    
  });

  it('Should be able to set Email', (done) => {
    joe.email = 'mail@mail.com';
    joe.save()
      .then(() => User.findOne({_id: joe._id}))
      .then((result) => {
        assert(result.email === 'mail@mail.com');
        done()
      })    
  });

  it('Should set Level to student by default', (done) => {
    assert(joe.level === 'student');
    done()
  });

  it('Should be able to set CheckIns', (done) => {
    const firstCheckIn = new CheckIn({});
    joe.checkIns.push(firstCheckIn);
    joe.save()
      .then(() => User.findOne({_id: joe._id}))
      .then((result) => {
        assert(String(result.checkIns) === String(firstCheckIn._id));
        done()
      })    
  });
});
