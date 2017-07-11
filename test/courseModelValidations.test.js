const Course = require('../models/Course');
const config = require('./config.test.js');

const assert = require('assert');
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.createConnection(config.MONGODB_URI);

mongoose.Promise = global.Promise;

describe('Course model validations', () => {
  Course.collection.drop();

  beforeEach( (done) => {
    const python = new Course({
      name: 'Beginner python',
      description: 'Learn python with friends',
    });
    python.save( (err) => {
      done();
    });
  });

  afterEach( (done) => {
    Course.collection.drop();
    done();
  });

  it('Should require title', (done) => {
    const ruby = new Course({ name: undefined });
    const validationResult = ruby.validateSync();
    const message = validationResult.errors.title.message;
    assert(message === 'Title is required');
    done();
  });
  
  it('Should require title length more than 2 chars', (done) => {
    const ruby = new Course({ 
      title: 'rr',
    });
    const validationResult = ruby.validateSync();
    const message = validationResult.errors.title.message;
    assert(message === 'Title must be valid length');
    done();
  });

  it('Should require title length less than 100 chars', (done) => {
    const ruby = new Course({ 
      title: 'r'.repeat(100),
    });
    const validationResult = ruby.validateSync();
    const message = validationResult.errors.title.message;
    assert(message === 'Title must be valid length');
    done();
  });

  it('Should require description length more than 2 chars', (done) => {
    const ruby = new Course({ 
      title: 'ruby',
      description: 'rr'
    });
    const validationResult = ruby.validateSync();
    const message = validationResult.errors.description.message;
    assert(message === 'Description must be valid length');
    done();
  });

  it('Should require description length less than 10000 chars', (done) => {
    const ruby = new Course({ 
      title: 'ruby',
      description: 'r'.repeat(10000)
    });
    const validationResult = ruby.validateSync();
    const message = validationResult.errors.description.message;
    assert(message === 'Description must be valid length');
    done();
  });
});
