const Event = require('../../models/Event');
const User = require('../../models/User');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Event modelCreate', () => {
  let sql;

  beforeEach((done) => {
    sql = new Event({title: 'sql'})
    sql.save()
      .then(() => done());
  });
  afterEach((done) => {
    User.collection.drop();
    Event.collection.drop();
    done();
  });

  it('Should create a new Event record', (done) => {
    assert(!sql.isNew);
    done();
  });

  it('Should be able to set Event Description', (done) => {
    sql.description = "beginner sql";
    sql.save()
      .then((result) => {
        assert(result.description === "beginner sql");
        done();
      })
  });

  it('Should be able to set Event Tags', (done) => {
    sql.tags = ['sql', 'beginner']
    sql.save()
      .then(() => Event.findOne({title: 'sql'}))
      .then((result) => {
        assert(result.tags[0] === 'sql');
        assert(result.tags[1] === 'beginner');
        done();
      });
  });

  it('Should set CreatedAt timestamp by default', (done) => {
    assert(sql.createdAt instanceof Date);
    done();
  });

  it('Should be able to set CreatedBy', (done) => {
    const joe = new User({});
    sql.instructors.push({_id: joe._id})
    sql.save()
      .then(() => Event.findOne({title: 'sql'}))
      .then((result) => {
        assert(String(result.instructors) === String(joe._id));
        done();
    });
  });

});
