const Event = require('../../models/Event');
const User = require('../../models/User');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Event modelUpdate', () => {
  let sql;

  beforeEach((done) => {
    const joe = new User({});
    sql = new Event({
      title: 'sql',
      description: 'beginner sql',
      tags: ['beginner', 'sql'],
      instructors: [{_id: joe._id}]
    });
    sql.save()
      .then(() => done());
  });

  afterEach((done) => {
    Event.collection.drop();
    User.collection.drop();
    done();
  });

  it('Should update Title', (done) => {
    sql.title = 'ruby';
    sql.save()
      .then(() => Event.findOne({_id: sql._id}))
      .then((result) => {
        assert(result.title === 'ruby');
        done();
      });
  });

  it('Should update Description', (done) => {
    sql.description = 'beginner ruby';
    sql.save()
      .then(() => Event.findOne({_id: sql._id}))
      .then((result) => {
        assert(result.description === 'beginner ruby');
        done();
      });
  });

  it('Should update Tags', (done) => {
    sql.tags = ['beginner', 'ruby']
    sql.save()
      .then(() => Event.findOne({_id: sql._id}))
      .then((result) => {
        assert(result.tags[0] === 'beginner');
        assert(result.tags[1] === 'ruby');
        done();
      });
  });

  it('Should update Instructors', (done) => {
    const jane = new User({});
    sql.instructors = {_id: jane._id};
    sql.save()
      .then(() => Event.findOne({_id: sql._id}))
      .then((result) => {
        assert(String(result.instructors[0]) === String(jane._id));
        done();
      });
  });
});
