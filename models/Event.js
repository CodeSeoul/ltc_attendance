const bookshelf = require('../config/bookshelf').bookshelf;
const CheckIn = require('./checkIn').CheckIn;
const moment = require('moment');
const CheckIt = require('checkit');
const User = require('./User').User;

const Event = bookshelf.Model.extend({

    tableName: 'event',
    hasTimestamps: true,

    initialize: function () {
        //this.on('saving', this.validateSave, this);
    },

    checkIns: function () {
        return this.hasMany('CheckIn', 'event_id');
    },

    instructors: function () {
        return this.belongsToMany('User', 'event_instructor');
    },

    created_by: function () {
        return this.belongsTo('User', 'created_by');
    },

    validationRules: {
        title: ['required', 'string', 'minLength: 5', 'maxLength:100'],
        description: ['required', 'string', 'minLength:10', 'maxLength:10000'],
        type: ['required', 'string', (val) => {
            if (['workshop', 'course', 'hack-night', 'study-group', 'social', 'lecture'].includes(val) === false) {
                throw new Error('Type must be one of ["workshop", "course", "hack-night", "study-group", "social", "lecture"]')
            }
        }],
        created_by: ['required', (val) => {
            if (instanceOf(val, User) !== true) {
                throw new Error('created_by must be a User model')
            }
        }]
    },

    validateSave: function () {
        return CheckIt(this.validationRules).validate(this.toJSON());
    }
});

const Events = bookshelf.Collection.extend({
    model: Event
});

module.exports = {
    Event: bookshelf.model('Event', Event),
    Events: Events
};
