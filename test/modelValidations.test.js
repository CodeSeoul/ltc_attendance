const User = require('../models/User');
const config = require('./config.test.js');

const assert = require('assert');
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.createConnection(config.MONGODB_URI);

mongoose.Promise = global.Promise;

describe('Model validations', () => {
  User.collection.drop();

  beforeEach( (done) => {
    const newUser1 = new User({
      name: 'Joe',
      email: 'mail@mail.com'
    });
    newUser1.save( (err) => {
      done();
    });
  });

  afterEach( (done) => {
    User.collection.drop();
    done();
  });

  it('Should require valid email', (done) => {
    const user = new User({ 
      name: 'Jane',
      email: 'mm.'
    });
    const validationResult = user.validateSync();
    const message = validationResult.errors.email.message;
    assert(message === 'Email must be valid');
    done()
  });

  it.only('Should require unique email', (done) => {
    const user1 = new User({ 
      name: 'Tim',
      email: 'mail@mail.com',
    });

    user1.save()
      .then()
      .catch((err) => {
          assert(err.message.includes('duplicate key error'));
          done();
      })
  });

  it('Should have user level set to student by default', (done) => {
    User.findOne({name: 'Joe'}) 
      .then((user) => {
        console.log(user); 
        console.log('user'); 
        assert(user.level === 'student')
        done();
      })
  });

});
