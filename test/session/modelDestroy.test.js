const Session = require('../../models/session');
const Course = require('../../models/Course');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Session modelDestroy', () => {
  let firstSession;

  beforeEach((done) => {
    firstSession = new Session({});
    firstSession.save()
      .then(() => done());
  });
  afterEach((done) => {
    Session.collection.drop();
    Course.collection.drop();
    done();
  });

  it('Should destroy session record', (done) => {
    const session2 = new Session({})
      session2.save()
      .then(() => Session.remove({_id: firstSession._id}))
      .then(() => Session.find({}))
      .then((results) => {
        assert(results.length === 1);
        assert(String(results[0]._id) === String(session2._id));
        done()
      });
  });
});
