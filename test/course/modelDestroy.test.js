const Course = require('../../models/Course');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Course modelDestroy', () => {
  beforeEach((done) => {
    const sql = new Course({title: 'sql'})
    sql.save()
      .then(() => done());
  });
  afterEach((done) => {
    Course.collection.drop();
    done();
  });

  it('Should destroy course record', (done) => {
    const ruby = new Course({title: 'ruby'})
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
