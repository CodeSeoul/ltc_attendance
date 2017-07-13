const Session = require('../../models/session');
const CheckIn = require('../../models/checkIn');
const Course = require('../../models/Course');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Session modelUpdate', () => {
  let firstSession;

  beforeEach((done) => {
    firstSession = new Session({});
    firstCheckIn = new CheckIn({});
    sql = new Course({title: 'sql'});
    firstSession.checkIns = [{_id: firstCheckIn._id}];
    firstSession.course = {_id: sql._id};

    firstSession.save()
      .then(() => done());
  });
  afterEach((done) => {
    Session.collection.drop();
    CheckIn.collection.drop();
    Course.collection.drop();
    done();
  });

  it('Should update a Session sessionOpen status', (done) => {
    firstSession.sessionOpen = false;
    firstSession.save()
      .then(() => Session.findOne({_id: firstSession._id}))
      .then((result) => {
        assert(result.sessionOpen === false);
        done();
      });
  });
  it('Should update a Session checkIns list', (done) => {
    const checkIn2 = new CheckIn({});
    firstSession.checkIns = [{_id: checkIn2._id}];
    firstSession.save()
      .then(() => Session.findOne({_id: firstSession._id}))
      .then((result) => {
        assert(String(result.checkIns[0]) === String(checkIn2._id));
      done();
    });
  });
  it('Should update a Session course', (done) => {
    const ruby = new Course({title: 'ruby'});
    firstSession.course = {_id: ruby._id};
    firstSession.save()
      .then(() => Session.findOne({_id: firstSession._id}))
      .then((result) => {
        assert(String(result.course) === String(ruby._id));
      done();
    });
  });
});
