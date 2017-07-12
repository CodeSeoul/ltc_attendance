const User = require('../../models/User');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('User Read model', () => {

  it('Should find a User record', (done) => {
    const joe = new User({
      name: 'joe',
      email: 'mail@mail.com'
    })
    .save()
    .then(() => User.findOne({email: 'mail@mail.com'}))
    .then((result) => {
      assert(result.name === 'joe');
      done();
    });
  });
});
