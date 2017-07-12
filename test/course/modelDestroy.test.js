const Course = require('../../models/Course');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Course Destroy model', () => {
  beforeEach((done) => {
    const sql = new Course({title: 'sql', description: 'beginner sql'})
    sql.save()
      .then(() => done());
  });
  afterEach((done) => {
    Course.collection.drop();
    done();
  });

  it('Should destroy Course with name sql', (done) => {
    const ruby = new Course({title: 'ruby', description: 'beginner ruby'})
      ruby.save()
      .then(() => Course.remove({title: 'sql'}))
      .then(() => Course.find({}))
      .then((results) => {
        assert(results.length === 1);
        assert(results[0].title === 'ruby');
        done()
      });
  });
});
