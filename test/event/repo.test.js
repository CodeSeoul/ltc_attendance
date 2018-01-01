// require('../test_helper.test');
// const knex = require('../../config/bookshelf').knex;
// const Event = require('../../models/Event').Event;
// const User = require('../../models/User').User;
// const Repo = require('../../src/eventRepository');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// const expect = chai.expect;
//
// describe('Event Repo routes', () => {
//     let joe;
//     let introEvent;
//
//     beforeEach(() => {
//         joe = new User({
//             username: 'joe',
//             email: 'joe@mail.com',
//             password: 'somepass',
//             level: 'student'
//         });
//
//         introEvent = new Event({
//             username: 'tad',
//             email: 'tad@mail.com',
//             password: 'otherpass',
//             level: 'student'
//         });
//
//         return joe.save()
//             .then((savedJoe) => {
//                 joe = savedJoe;
//                 return tad.save();
//             })
//             .then((savedTad) => {
//                 tad = savedTad;
//             });
//     });
//
//     afterEach(() => {
//         return knex('event').truncate();
//     });
//
//     it('should list all users with getUsers()', () => {
//         return Repo.getUsers()
//             .then(users => {
//                 const sortedUsers = users.models.sort(function (a, b) {
//                     if (a.get('username').toUpperCase() < b.get('username').toUpperCase()) return -1;
//                     if (a.get('username').toUpperCase() > b.get('username').toUpperCase()) return 1;
//                     return 0;
//                 });
//                 expect(sortedUsers).to.be.a('array');
//                 expect(sortedUsers.length).to.be.eql(2);
//                 expect(sortedUsers[0].toJSON()).to.have.property('id');
//                 expect(sortedUsers[0].toJSON()).to.have.property('username').eql('joe');
//                 expect(sortedUsers[0].toJSON()).to.have.property('email').eql('joe@mail.com');
//                 expect(sortedUsers[0].toJSON()).to.have.property('level').eql('student');
//                 return sortedUsers[0].comparePassword('somepass');
//             })
//             .then(isMatch => {
//                 expect(isMatch).to.eql(true);
//             });
//     });
//
//     it('should add new user with createUser()', () => {
//         const jane = {username: 'jane', email: 'jane@mail.com', password: 'roflcopter', level: 'student'};
//         return Repo.createUser(jane)
//             .then(newUser => {
//                 expect(newUser.toJSON()).to.have.property('username').eql('jane');
//                 expect(newUser.toJSON()).to.have.property('email').eql('jane@mail.com');
//                 return Repo.getUsers();
//             })
//             .then(users => {
//                 expect(users.models).to.be.a('array');
//                 expect(users.length).to.be.eql(3);
//             });
//     });
//
//     it('should list single user with getUser()', () => {
//         return Repo.getUser(joe.get('id'))
//             .then(result => {
//                 expect(result.toJSON()).to.have.property('username').eql('joe');
//             });
//     });
//
//     it('should update existing user with updateUser()', () => {
//         let toBeUpdated = {email: 'thadious@m.com'};
//         return Repo.updateUser(tad.get('id'), toBeUpdated)
//             .then(() => {
//                 return Repo.getUser(tad.get('id'));
//             })
//             .then(user => {
//                 expect(user.toJSON()).to.have.property('email').eql('thadious@m.com');
//             });
//     });
//
//     it('should delete existing user with deleteUser()', () => {
//         return Repo.getUsers()
//             .then(users => {
//                 expect(users.length).to.eql(2);
//                 return Repo.deleteUser(joe.get('id'));
//             })
//             .then(() => {
//                 return Repo.getUsers()
//             })
//             .then(users => {
//                 expect(users.length).to.eql(1);
//             });
//     });
// })
// ;
