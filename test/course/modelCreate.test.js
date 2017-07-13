const Course = require('../../models/Course');
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

  it('Should create a new Course record', (done) => {
    ruby = new Course({title: 'ruby', description: 'beginner ruby'})
    .save()
    .then((result) => {
      assert(!ruby.isNew);
      done();
    });
  });

  it('Should create record with Tags embeded refrence', (done) => {
    sql.tags = ['sql', 'beginner']
    sql.save()
      .then(() => Course.findOne({title: 'sql'}))
      .then((result) => {
        assert(result.tags[0] === 'sql');
        assert(result.tags[1] === 'beginner');
        done();
      });
  });

  it('Should create record with CreatedBy User obj refrence', (done) => {
    sql.set('instructors', [{_id: joe._id}])
    sql.save()
      .then(() => {
        Course.findOne({title: 'sql'})
      .populate('instructors')
      .then((result) => {
        assert(result.instructors[0].name === 'joe');
        done();
      });
    });
  });

  it('Should set createdAt should have timestamp by default', (done) => {
    assert(sql.createdAt instanceof Date);
    done();
  });
});
