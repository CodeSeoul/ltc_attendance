process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const userRepository = require('../src/userRepository');
const Repo = new userRepository();

mongoose.Promise = global.Promise; 

const server = require('../app');
const User = require('../models/User');

const should = chai.should();
chai.use(chaiHttp);

describe('User', () => {

  User.collection.drop();

  beforeEach( (done) => {
    let newUser1 = new User({
      name: 'Mr Jones',
      email: 'bdylan@mail.com'
    });
    newUser1.save( (err) => {
      done();
    });
  });

  afterEach( (done) => {
    User.collection.drop();
    done();
  });

  it('should list all users with getUsers()', (done) => {
    Repo.getUsers(users => {
      users.should.be.a('array');
      users[0].should.have.property('_id');
      users[0].should.have.property('name').eql('Mr Jones');
      users[0].should.have.property('email').eql('bdylan@mail.com');
      users[0].should.have.property('level').eql('student');
      users.length.should.be.eql(1);
      done();
    });
  });

  it('should add a new user with createUser()', (done) => {
    let newUser2 = new User();
        newUser2.name = 'Bat Man';
        newUser2.email = 'bman@mail.com';
    Repo.createUser(newUser2, newUser => {
      newUser.should.have.property('name').eql('Bat Man');
      newUser.should.have.property('email').eql('bman@mail.com');
      Repo.getUsers(users => {
        users.should.be.a('array');
        users.length.should.be.eql(2);
        done();
      });
    });
  });

  it('should list a single user with getUser()', (done) => {
    let newUser3 = new User();
        newUser3.name = 'Tom Bossworth';
        newUser3.email = 'Tommy@mail.com';
    Repo.createUser(newUser3, newUser => {
      Repo.getUser(newUser._id, result => {
        result.should.have.property('_id').eql(newUser._id);
        done()
      });
    });
  });

  it('should update existing user with updateUser()', (done) => {
    let newUser4 = new User();
        newUser4.name = 'Maggie May';
        newUser4.email = 'wakeup@mail.com';
    Repo.createUser(newUser4, newUser => {
      newUser._id.should.be.equal(newUser4._id);
      newUser.email = 'milwaukee@mail.com';
      Repo.updateUser(newUser._id, newUser, result => {
        newUser.email.should.be.equal('milwaukee@mail.com');
        done();
      });
    });
  });

  it('should delete an existing user with deleteUser()', (done) => {
    let newUser5 = new User();
        newUser5.name = 'Sarah Dimond';
        newUser5.email = 'huricane@mail.com';
    Repo.createUser(newUser5, newUser => {
      Repo.getUsers(users => {
        users.length.should.be.eql(2);
        Repo.deleteUser(newUser, result => {
          Repo.getUsers(users => {
            users.length.should.be.eql(1);
            users[0].name.should.not.be.eql('Sarah Dimond');
            done()
          });
        });
      });
    });
  });

});
