const User = require('../../models/User');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('User Create', () => {
  it('Should create a new User', (done) => {
    const joe = new User({
      name: 'joe',
      email: 'mail@mail.com'
    })
    .save()
    .then(() => {
      assert(!joe.isNew);
      done();
    });
  });

  it('Should set level default value to student', (done) => {
    const joe = new User({
      name: 'joe',
      email: 'mail@mail.com'
    })
    .save()
    .then((result) => {
      assert(result.level === 'student');
      done();
    });
  });
});
