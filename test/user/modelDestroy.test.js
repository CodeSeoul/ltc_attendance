const User = require('../../models/User');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('User Destroy model', () => {
  beforeEach((done) => {
    const joe = new User({name: 'joe', email: 'mail@mail.com'});
    joe.save()
      .then(() => done());
  });
  afterEach((done) => {
    User.collection.drop();
    done();
  });

  it('Should destroy user with name joe', (done) => {
    const jane = new User({name: 'jane', email: 'jane@mail.com'})
      .save()
      .then(() => User.remove({name: 'joe'}))
      .then(() => User.find({}))
      .then((results) => {
        assert(results.length === 1);
        assert(results[0].name === 'jane');
        done()
      });
  });
});
