require('../test_helper.test');
const Repo = require('../../src/userRepository');
const User = require('../../models/User');
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
            });
    });

    afterEach((done) => {
        User.collection.drop();
        done();
    });

    it('should list all users with getUsers()', (done) => {
        Repo.getUsers()
            .then(users => {
                const sortedUsers = users.sort(function (a, b) {
                    if (a.username.toUpperCase() < b.username.toUpperCase()) return -1;
                    if (a.username.toUpperCase() > b.username.toUpperCase()) return 1;
                    return 0;
                });
                expect(sortedUsers).to.be.a('array');
                expect(sortedUsers.length).to.be.eql(2);
                expect(sortedUsers[0]).to.have.property('_id');
                expect(sortedUsers[0]).to.have.property('username').eql('joe');
                expect(sortedUsers[0]).to.have.property('email').eql('joe@mail.com');
                expect(sortedUsers[0]).to.have.property('level').eql('student');
                return sortedUsers[0].comparePassword('somepass');
            })
            .then(isMatch => {
                expect(isMatch).to.eql(true);
                done();
            })
            .catch(err => {
                expect(err).to.eql(null);
                done();
            });
    });

    it('should add new user with createUser()', (done) => {
        const jane = new User({username: 'jane', email: 'jane@mail.com', password: 'roflcopter'});
        Repo.createUser(jane)
            .then(newUser => {
                expect(newUser.res).to.have.property('username').eql('jane');
                expect(newUser.res).to.have.property('email').eql('jane@mail.com');
                return Repo.getUsers();
            })
            .then(users => {
                expect(users).to.be.a('array');
                expect(users.length).to.be.eql(3);
                done();
            });
    });

    it('should list single user with getUser()', (done) => {
        Repo.getUser(joe._id)
            .then(result => {
                expect(result).to.have.property('username').eql('joe');
                done()
            });
    });

    it('should update existing user with updateUser()', (done) => {
        const jane = new User({username: 'jane', email: 'jane@mail.com', password: 'datpass'});
        let toBeUpdated = new User({email: 'thadious@m.com'});
        Repo.createUser(jane)
            .then(() => {
                return Repo.updateUser(tad._id, toBeUpdated);
            })
            .then(() => {
                return Repo.getUser(tad._id)
            })
            .then(user => {
                expect(user.email).to.eql('thadious@m.com');
                done();
            });
    });
});

it('should delete existing user with deleteUser()', (done) => {
    Repo.getUsers()
        .then(users => {
            expect(users.length).to.eql(2);
            return Repo.deleteUser(joe._id)
        })
        .then(() => {
            return Repo.getUsers()
        })
        .then(users => {
            expect(users.length).to.eql(1);
            done();
        });
});
