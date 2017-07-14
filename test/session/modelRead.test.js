const Session = require('../../models/session');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Session modelRead', () => {

  it('Should find a session by _id', (done) => {
    const firstSession = new Session({});
    firstSession.save()
      .then(() => Session.findOne({_id: firstSession._id}))
      .then((result) => {
        assert(String(result._id) === String(firstSession._id));
        done()
      });
  });

});
