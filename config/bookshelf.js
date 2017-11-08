module.exports = {

    configureBookshelf: (runMode) => {
        if (runMode === 'prod') {

            console.log('configuring database in prod mode');
            const config = require('./database.prod.js');

            module.exports.knex = require('knex')({
                client: config.DB_TYPE,
                connection: {
                    host: config.HOST,
                    user: config.USER,
                    password: config.PASSWORD,
                    database: config.DATABASE,
                    charset: config.CHARSET
                }
            });
        } else {

            console.log('configuring database in dev mode');
            const config = require('./database.dev.js');

            module.exports.knex = require('knex')({
                client: config.DB_TYPE,
                connection: {
                    filename: config.FILENAME
                }
            });
        }

        const bookshelf = require('bookshelf')(module.exports.knex);
        bookshelf.plugin('registry');
        bookshelf.plugin('virtuals');
        bookshelf.plugin('visibility');
        module.exports.bookshelf = bookshelf;
    },

    initializeDevDb: () => {
        console.log('creating tables');
        module.exports.knex.schema.createTableIfNotExists('user', (table) => {
            table.increments();
            table.string('username');
            table.string('password');
            table.string('name');
            table.string('email', 128);
            table.string('level').defaultTo('student');
            table.string('website');
            table.string('hometown');
            table.string('description');
            table.timestamps();
        }).createTableIfNotExists('course', (table) => {
            table.increments();
            table.string('title');
            table.string('description');
            table.string('created_by');
            table.timestamps();
        }).createTableIfNotExists('check_in', (table) => {
            table.increments();
            table.integer('user_id');
            table.integer('course_id');
            table.timestamps();
        }).createTableIfNotExists('course_instructor', (table) => {
            table.increments();
            table.integer('course_id');
            table.integer('user_id');
            table.timestamps();
        }).then(() => {
            console.log('created tables');
        });

    }
};
