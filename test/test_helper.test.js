const bookshelfSetup = require('../config/bookshelf');

bookshelfSetup.configureBookshelf('dev');
bookshelfSetup.initializeDevDb();

beforeEach(done => {
    const knex = bookshelfSetup.knex;
    knex('check_in').truncate()
        .then(() => {
            knex('event_instructor').truncate();
        })
        .then(() => {
            knex('event').truncate();
        })
        .then(() => {
            knex('user').truncate();
            done();
        });
});