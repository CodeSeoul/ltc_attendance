const bookshelfSetup = require('../config/bookshelf');

bookshelfSetup.configureBookshelf('dev');
bookshelfSetup.initializeDevDb();