const Course = require('../../models/Course');
const User = require('../../models/User');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Course Read', () => {

  beforeEach((done) => {
    const jane = new User({
      name: 'jane', 
      email: 'jane@mail.com', 
      level: 'instructor'
    });
    const joe = new User({
      name: 'joe', 
      email: 'joe@mail.com',
      level: 'instructor'
    });
    Promise.all([jane.save(), joe.save()])
      .then(() => {
        const sql = new Course({
          title: 'sql', 
          description: 'beginner sql',
          tags: [{title: 'sql'}, {title: 'beginner'}],
          instructors: [{_id : jane._id}]
        })
        const ruby = new Course({
          title: 'ruby', 
          description: 'intermediate ruby',
          tags: [{title: 'ruby'}, {title: 'intermediate'}],
          instructors: [{_id : joe._id}]
        })
        const go = new Course({
          title: 'go', 
          description: 'beginner go',
          tags: [{title: 'beginner'}],
          instructors: [{_id : joe._id}, {_id: jane._id}]
        })
      Promise.all([sql.save(), ruby.save(), go.save()])
        .then(() => done());
      })
  });

  afterEach((done) => {
    User.collection.drop();
    Course.collection.drop();
    done();
  });

  it('Should find all courses', (done) => {
    Course.find({})
      .then((users) => {
        assert(users.length === 3);
        done();
      });
  });

  it('Should find course instructor name jane for sql course', (done) => {
    Course.findOne({title: 'sql'})
      .populate('instructors')
      .then((user) => {
      assert(user.instructors[0].name === 'jane')
      done();
    })
  });

  it('Should find courses tag beginner for go course', (done) => {
    Course.findOne({title: 'go'})
      .populate('tags')
      .then((user) => {
      assert(user.tags[0].title === 'beginner')
      done();
    })
  });
});
