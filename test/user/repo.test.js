const config = require('../config.test.js')
const Repo = require('../../src/userRepository');
const User = require('../../models/User');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
chai.use(chaiHttp);

mongoose.connect(config.MONGODB_URI)

describe('User Repo routes', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            name: 'joe',
            email: 'joe@mail.com'
        });

        tad = new User({
            name: 'tad',
            email: 'tad@mail.com'
        });

        joe.save(() => {
            tad.save(() => {
                done();
            });
        });
    });

    afterEach((done) => {
        User.collection.drop();
        done();
    });

    it('should list all users with getUsers()', (done) => {
        Repo.getUsers(users => {
            const sortedUsers = users.sort(function (a, b) {
                if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
                if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
                return 0;
            });
            sortedUsers.should.be.a('array');
            sortedUsers[0].should.have.property('_id');
            sortedUsers[0].should.have.property('name').eql('joe');
            sortedUsers[0].should.have.property('email').eql('joe@mail.com');
            sortedUsers[0].should.have.property('level').eql('student');
            sortedUsers.length.should.be.eql(2);
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
                users.length.should.be.eql(3);
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
        const jane = new User({name: 'jane', email: 'jane@mail.com'});
        let toBeUpdated = {email: 'thadious@m.com'}
        Repo.createUser(jane, newUser => {
            Repo.updateUser(tad._id, toBeUpdated, result => {
                Repo.getUser(tad._id, user => {
                    user.email.should.be.equal('thadious@m.com');
                    done();
                });
            })
        });
    });

    it('should delete existing user with deleteUser()', (done) => {
        Repo.getUsers(users => {
            users.length.should.be.eql(2);
            Repo.deleteUser(joe._id, result => {
                Repo.getUsers(users => {
                    users.length.should.be.eql(1);
                    done();
                });
            });
        });
    });
});
