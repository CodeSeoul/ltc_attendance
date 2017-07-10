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
      name: 'Bob',
      email: 'grumpy@mail.com'
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

  it('Should require unique email', (done) => {
    const user1 = new User({ 
      name: 'Tim',
      email: 'grumpy@mail.com',
    });

    user1.save()
      .then(() => User.findOne({name: 'Tim'}))
      .then((result) => {
          console.log(result);
          assert(result !== null);
          done();
      });
  });

  it('Should have user level set to student by default', (done) => {
    User.findOne({name: 'Bob'}) 
      .then((user) => {
        assert(user.level === 'student')
        done();
      })
  });

});
