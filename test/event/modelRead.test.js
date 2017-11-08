const Event = require('../../models/Event');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Event modelRead', () => {

  it('Should find a Event by _id', (done) => {
    const sql = new Event({title: 'sql'});
    sql.save()
      .then(() => Event.findOne({_id: sql.id}))
      .then((result) => {
        assert(String(result._id) === String(sql.id));
        done()
      });
  });

});
