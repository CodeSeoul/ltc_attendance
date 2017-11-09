const bookshelfSetup = require('../config/bookshelf');

console.log('before');
bookshelfSetup.configureBookshelf('dev');
bookshelfSetup.initializeDevDb();

const CheckIns = require('../models/checkIn').CheckIns;
const Users = require('../models/User').Users;
const Events = require('../models/Event').Events;

beforeEach(done => {
    console.log('beforeEach');
    CheckIns.destroy()
        .then(() => {
            return Users.destroy();
        })
        .then(() => {
            Events.destroy();
            done();
        })
});