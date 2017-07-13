const Session = require('../../models/session');
const User = require('../../models/User');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Course Create', () => {
  let sql;
  let joe;

  beforeEach((done) => {
    sql = new Course({title: 'sql', description: 'beginner sql'})
    joe = new User({name: 'joe', email: 'mail@mail.com'});
    Promise.all([sql.save(), joe.save()])
      .then(() => done());
  });
  afterEach((done) => {
    User.collection.drop();
    Course.collection.drop();
    done();
  });

});
