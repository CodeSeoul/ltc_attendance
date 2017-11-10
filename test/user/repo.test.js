require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Repo = require('../../src/userRepository');
const User = require('../../models/User').User;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

describe('User Repo routes', () => {
    let joe, tad;

    beforeEach((done) => {
        joe = new User({
            username: 'joe',
            email: 'joe@mail.com',
            password: 'somepass'
        });

        tad = new User({
            username: 'tad',
            email: 'tad@mail.com',
            password: 'otherpass'
        });

        joe.save()
            .then(() => {
                return tad.save();
            })
            .then(() => {
                done();
            })
            .catch(err => done(err));
    });

    afterEach((done) => {
        knex('user').truncate()
            .then(() => done());
    });

    it('should list all users with getUsers()', (done) => {
        Repo.getUsers()
            .then(users => {
                const sortedUsers = users.models.sort(function (a, b) {
                    if (a.get('username').toUpperCase() < b.get('username').toUpperCase()) return -1;
                    if (a.get('username').toUpperCase() > b.get('username').toUpperCase()) return 1;
                    return 0;
                });
                expect(sortedUsers).to.be.a('array');
                expect(sortedUsers.length).to.be.eql(2);
                expect(sortedUsers[0].toJSON()).to.have.property('id');
                expect(sortedUsers[0].toJSON()).to.have.property('username').eql('joe');
                expect(sortedUsers[0].toJSON()).to.have.property('email').eql('joe@mail.com');
                expect(sortedUsers[0].toJSON()).to.have.property('level').eql('student');
                return sortedUsers[0].comparePassword('somepass');
            })
            .then(isMatch => {
                expect(isMatch).to.eql(true);
                done();
            })
            .catch(err => done(err));
    });

    it('should add new user with createUser()', (done) => {
        const jane = {username: 'jane', email: 'jane@mail.com', password: 'roflcopter'};
        Repo.createUser(jane)
            .then(newUser => {
                expect(newUser.toJSON()).to.have.property('username').eql('jane');
                expect(newUser.toJSON()).to.have.property('email').eql('jane@mail.com');
                return Repo.getUsers();
            })
            .then(users => {
                expect(users.models).to.be.a('array');
                expect(users.length).to.be.eql(3);
                done();
            })
            .catch(err => done(err));
    });

    it('should list single user with getUser()', (done) => {
        Repo.getUser(joe.get('id'))
            .then(result => {
                expect(result.toJSON()).to.have.property('username').eql('joe');
                done()
            })
            .catch(err => done(err));
    });

    it('should update existing user with updateUser()', (done) => {
        const jane = {username: 'jane', email: 'jane@mail.com', password: 'datpass'};
        let toBeUpdated = new User({email: 'thadious@m.com'});
        Repo.createUser(jane)
            .then(() => {
                return Repo.updateUser(tad.get('id'), toBeUpdated);
            })
            .then(() => {
                return Repo.getUser(tad.get('id'));
            })
            .then(user => {
                expect(user.toJSON()).to.have.property('email').eql('thadious@m.com');
                done();
            })
            .catch(err => done(err));
    });

    it('should delete existing user with deleteUser()', (done) => {
        Repo.getUsers()
            .then(users => {
                expect(users.length).to.eql(2);
                return Repo.deleteUser(joe.get('id'));
            })
            .then(() => {
                return Repo.getUsers()
            })
            .then(users => {
                expect(users.length).to.eql(1);
                done();
            })
            .catch(err => done(err));
    });
});
