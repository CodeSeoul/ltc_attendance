const Session = require('../../models/session');
const Course = require('../../models/Course');
const CheckIn = require('../../models/checkIn');
const config = require('../config.test.js');
const assert = require('assert');
const mongoose = require('mongoose');

describe('Session modelCreate', () => {
  let firstSession;

  beforeEach((done) => {
    firstSession = new Session({});
    firstSession.save()
      .then(() => done());
    
  });
  afterEach((done) => {
    Course.collection.drop();
    Session.collection.drop();
    done();
  });

  it('Should create a new Session record', (done) => {
    assert(!firstSession.isNew);
    done();
  });

  it('Should have SessionOpen set to true by default', (done) => {
    assert(firstSession.sessionOpen === true);
    done()
  });
  
  it('Should have Date timestamp be a date type', (done) => {
    assert(firstSession.date instanceof Date);
    done()
  });

  it('Should be able to set Course', (done) => {
    const sql = new Course({title: 'sql', description: 'beginner sql'})
    firstSession.course = {_id: sql._id};
    firstSession.save()
      .then(() => Session.findOne({_id: firstSession._id}))
      .then((result) => {
        assert(String(result.course) === String(sql._id));
        done()
      })
  });  
  
  it('Should be able to add to CheckIns', (done) => {
    const firstCheckIn = new CheckIn({});
    firstSession.checkIns.push(firstCheckIn)
    firstSession.save()
      .then(() => Session.findOne({_id: firstSession._id}))
      .then((result) => {
        assert(String(result.checkIns) === String(firstCheckIn._id));
        done()
      })
  });
});
