const bookshelf = require('../config/bookshelf').bookshelf;
const CheckIn = require('./checkIn').CheckIn;
const moment = require('moment');

const Event = bookshelf.Model.extend({

    tableName: 'event',
    hasTimestamps: true,

    checkIns: function () {
        return this.hasMany('CheckIn', 'event_id');
    },

    instructors: function () {
        return this.belongsToMany('User', 'event_instructor');
    },

    createdBy: function () {
        return this.belongsTo('User', 'created_by');
    },

    virtuals: {

        countCheckIns: function () {
            return this.related('checkIns').length;
        },

        createdAt: {
            get: function () {
                return moment(this.get('created_at')).format('YYYY-MM-DD HH:mm:ss');
            },
            set: function (newDate) {
                this.set('created_at', newDate);
            }
        },

        updatedAt: {
            get: function () {
                return moment(this.get('updated_at')).format('YYYY-MM-DD HH:mm:ss');
            },
            set: function (newDate) {
                this.set('updated_at', newDate)
            }
        }
    },
});

const Events = bookshelf.Collection.extend({
    model: Event
});

module.exports = {
    Event: bookshelf.model('Event', Event),
    Events: Events
};
