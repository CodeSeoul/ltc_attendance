const Course = require('../../models/Course');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Course modelRead', () => {

  it('Should find a Course by _id', (done) => {
    const sql = new Course({title: 'sql'});
    sql.save()
      .then(() => Course.findOne({_id: sql.id}))
      .then((result) => {
        assert(String(result._id) === String(sql.id));
        done()
      });
  });

});
