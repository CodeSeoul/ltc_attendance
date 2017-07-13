const Course = require('../../models/Course');
const User = require('../../models/User');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Course Update', () => {
  let sql;
  let joe;

  beforeEach((done) => {
    const jane = new User({
      name: 'jane', 
      email: 'jane@mail.com', 
      level: 'instructor'
    });
    joe = new User({
      name: 'joe', 
      email: 'joe@mail.com',
      level: 'instructor'
    });
    Promise.all([jane.save(), joe.save()])
      .then(() => {
        sql = new Course({
          title: 'sql', 
          description: 'beginner sql',
          tags: ['beginner'],
          instructors: [{_id : jane._id}]
        })
      sql.save()
        .then(() => done());
      })
  });

  afterEach((done) => {
    User.collection.drop();
    Course.collection.drop();
    done();
  });

  it('Should update sql course title to noSql', (done) => {
    sql.set('title', 'noSql');
    sql.save()
      .then(() => Course.find({}))
      .then((courses) => {
        assert(courses[0].title === 'noSql');
        done();
      });
  });

  it('Should update sql course description to beginner noSql', (done) => {
    sql.set('description', 'beginner noSql');
    sql.save()
      .then(() => Course.find({}))
      .then((courses) => {
        assert(courses[0].description === 'beginner noSql');
        done();
      });
  });

  it('Should update sql course tag to intermediate', (done) => {
    sql.set('tags', ['intermediate']);
    sql.save()
      .then(() => Course.find({}))
      .then((courses) => {
        assert(courses[0].tags[0] === 'intermediate');
        done();
      });
  });

  it('Should update sql course instructor to joe', (done) => {
    sql.instructors = [{_id: joe._id}];
    sql.save()
      .then(() => {
        Course.find({})
        .populate('instructors')
        .then((courses) => {
          assert(courses[0].instructors[0].name === 'joe');
          done();
        });
      });
  });
});
