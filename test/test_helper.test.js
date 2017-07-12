const mongoose = require('mongoose');
const config = require('./config.test.js')

mongoose.set('debug', true);
mongoose.createConnection(config.MONGODB_URI);

mongoose.Promise = global.Promise;

beforeEach((done) => {
  const { users, courses } = mongoose.connection.collections;
  users.drop(() => {
    courses.drop(() => done());
  });
});
