const mongoose = require('mongoose');
const config = require('./config.test.js')

mongoose.set('debug', true);
mongoose.createConnection(config.MONGODB_URI);

mongoose.Promise = global.Promise;

beforeEach((done) => {
  const { users, events } = mongoose.connection.collections;
  users.drop(() => {
    events.drop(() => done());
  });
});
