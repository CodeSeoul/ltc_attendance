const bookshelf = require('../config/bookshelf').bookshelf;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const CheckIn = require('./checkIn');

// TODO: Add validations
const User = bookshelf.Model.extend({

    tableName: 'user',
    hasTimestamps: true,
    hidden: ['password'],

    initialize: function () {
        this.on('save', this.hashPassword, this);
    },

    checkIns: function () {
        return this.hasMany('CheckIn', 'user_id');
    },

    instructingCourses: function () {
        return this.belongsToMany('Course', 'course_instructor', 'user_id');
    },

    createdCourses: function () {
        return this.hasMany('Course', 'created_by');
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
                this.set('updated_at', newDate);
            }
        }
    },

    // https://wesleytsai.io/2015/07/28/bookshelf-bcrpyt-password-hashing/
    hashPassword: function (model, attrs, options) {
        return new Promise((resolve, reject) => {
            if (!model.hasChanged('password')) return resolve(model.get('password'));

            bcrypt.hash(model.get('password'), SALT_WORK_FACTOR)
                .then(hashedPassword => {
                    model.set('password', hashedPassword);
                    resolve(hashedPassword);
                })
                .catch(err => {
                    console.log('Error salting and hashing password:', err);
                    reject(err);
                });
        });
    },

    comparePassword: function (candidatePassword) {
        const result = bcrypt.compare(candidatePassword, this.get('password'));
        return result;
    }
});

const Users = bookshelf.Collection.extend({
    model: User
});

module.exports = {
    User: bookshelf.model('User', User),
    Users: Users
};
