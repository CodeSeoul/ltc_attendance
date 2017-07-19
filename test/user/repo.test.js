const config = require('../config.test.js')
const Repo = require('../../src/userRepository');
const User = require('../../models/User');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
chai.use(chaiHttp);

mongoose.connect(config.MONGODB_URI)

describe('User Repo routes', () => {
  let joe;

  beforeEach( (done) => {
    joe = new User({
      name: 'joe',
      email: 'joe@mail.com'
    });
    joe.save( (err) => {
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
      users[0].should.have.property('name').eql('joe');
      users[0].should.have.property('email').eql('joe@mail.com');
      users[0].should.have.property('level').eql('student');
      users.length.should.be.eql(1);
      done();
    });
  });

  it('should add new user with createUser()', (done) => {
    const jane = new User({name: 'jane', email: 'jane@mail.com'});
    Repo.createUser(jane, newUser => {
      newUser.res.should.have.property('name').eql('jane');
      newUser.res.should.have.property('email').eql('jane@mail.com');
      Repo.getUsers(users => {
        users.should.be.a('array');
        users.length.should.be.eql(2);
        done();
      });
    });
  });

  it('should list single user with getUser()', (done) => {
    Repo.getUser(joe._id, result => {
      result.should.have.property('name').eql('joe');
      done()
    });
  });

  it('should update existing user with updateUser()', (done) => {
    let toBeUpdated = {email: 'm@m.com'}
    Repo.updateUser(joe._id, toBeUpdated, result => {
      Repo.getUser(result._id, result2 => {
        result2.email.should.be.equal('m@m.com');
        done();
      });
    })
  });

  it('should delete existing user with deleteUser()', (done) => {
    Repo.getUsers(users => {
      users.length.should.be.eql(1);
      Repo.deleteUser(joe._id, result => {
        Repo.getUsers(users => {
          users.length.should.be.eql(0);
          done();
        });
      });
    });
  });
});
