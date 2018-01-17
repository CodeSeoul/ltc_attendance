const bookshelf = require('../config/bookshelf').bookshelf;

const CheckIn = bookshelf.Model.extend({

    tableName: 'check_in',
    hasTimestamps: true,

    user: function () {
        return this.belongsTo('User', 'user_id');
    },

    event: function () {
        return this.belongsTo('Event', 'event_id');
    }
});

const CheckIns = bookshelf.Collection.extend({
    model: CheckIn
});

module.exports = {
    CheckIn: bookshelf.model('CheckIn', CheckIn),
    CheckIns: CheckIns
};
