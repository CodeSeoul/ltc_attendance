const Session = require('../../models/session');
const CheckIn = require('../../models/checkIn');
const Event = require('../../models/Event');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Session modelUpdate', () => {
  let firstSession;

  beforeEach((done) => {
    firstSession = new Session({});
    firstCheckIn = new CheckIn({});
    sql = new Event({title: 'sql'});
    firstSession.checkIns = [{_id: firstCheckIn._id}];
    firstSession.event = {_id: sql._id};

    firstSession.save()
      .then(() => done());
  });
  afterEach((done) => {
    Session.collection.drop();
    CheckIn.collection.drop();
    Event.collection.drop();
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
  it('Should update a Session event', (done) => {
    const ruby = new Event({title: 'ruby'});
    firstSession.event = {_id: ruby._id};
    firstSession.save()
      .then(() => Session.findOne({_id: firstSession._id}))
      .then((result) => {
        assert(String(result.event) === String(ruby._id));
      done();
    });
  });
});
