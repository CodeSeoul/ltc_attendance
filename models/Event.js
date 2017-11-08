const bookshelf = require('../config/bookshelf').bookshelf;
const moment = require('moment');

const Events = bookshelf.Model.extend({

    tableName: 'course',
    hasTimestamps: true,

    checkIns: function () {
        return this.hasMany('CheckIn', 'course_id');
    },

    instructors: function () {
        return this.belongsToMany('User', 'course_instructor');
    },

    createdBy: function () {
        return this.belongsTo('User', 'created_by');
    },

    virtuals: {

        countCheckIns: function () {
            const checkIns = this.get('checkIns');
            if (checkIns) {
                return checkIns.count();
            } else {
                return 0;
            }
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
