const bookshelf = require('../config/bookshelf').bookshelf;
const moment = require('moment');

const Course = bookshelf.Model.extend({

    tableName: 'course',
    hasTimestamps: true,

    checkIns: function () {
        return this.hasMany('CheckIn', 'course_id');
    },

    instructors: function () {
        return this.belongsToMany('User', 'course_instructor', 'course_id');
    },

    createdBy: function () {
        return this.belongsTo('User', 'created_by');
    },

    virtuals: {
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

const Courses = bookshelf.Collection.extend({
    model: Course
});

module.exports = {
    Course: bookshelf.model('Course', Course),
    Courses: Courses
};
