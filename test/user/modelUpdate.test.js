const User = require('../../models/User');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('User Update model', () => {
 let joe;

  beforeEach((done) => {
    joe = new User({name: 'joe', email: 'mail@mail.com'});
    joe.save()
      .then(() => done());
  });
  afterEach((done) => {
    User.collection.drop();
    done();
  });

  it('Should update name from joe to Joey', (done) => {
    joe.set('name', 'Joey')
    joe.save()
      .then(() => User.findOne({email: 'mail@mail.com'}))
      .then((result) => {
        assert(result.name === 'Joey');
        done();
      });
  });

  it('Should update email from mail@mail.com to m@m.com', (done) => {
    joe.set('email', 'm@m.com')
    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then((result) => {
        assert(result.email === 'm@m.com');
        done();
      });
  });

  it('Should update level from student to admin', (done) => {
    joe.set('level', 'admin')
    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then((result) => {
        assert(result.level === 'admin');
        done();
      });
  });
});
