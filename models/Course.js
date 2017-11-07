const bookshelf = require('../config/bookshelf').bookshelf;

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
                return this.get('created_at');
            },
            set: function (newDate) {
                this.set('created_at', newDate);
            }
        },

        updatedAt: {
            get: function () {
                return this.get('updated_at');
            },
            set: function (newDate) {
                this.set('updated_at', newDate)
            }
        },

        createdBy: {
            get: function () {
                return this.get('created_by');
            },
            set: function (user) {
                this.set('created_by', user)
            }
        }
    },
});

const Courses = bookshelf.Collection.extend({
    model: Course
});

module.exports = {
    Course: Course,
    Courses: Courses
};
