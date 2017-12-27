const bookshelf = require('../config/bookshelf').bookshelf;
const bcrypt = require('bcrypt');
const CheckIt = require('checkit');

const SALT_WORK_FACTOR = 10;

const User = bookshelf.Model.extend({

    tableName: 'user',
    hasTimestamps: true,
    // hidden: ['password'], TODO: best way to hide + validate

    initialize: function () {
        this.on('saving', this.validateSave, this);
        this.on('saving', this.hashPassword, this);
        this.on('saving', this.setDefaults, this);
    },

    checkIns: function () {
        return this.hasMany('CheckIn', 'user_id');
    },

    instructingEvents: function () {
        return this.belongsToMany('Event', 'event_instructor', 'user_id');
    },

    createdEvents: function () {
        return this.hasMany('Event', 'created_by');
    },

    validationRules: {
        username: ['required'],
        password: ['required'],
        email: ['required', 'email'],
        level: ['required'],
    },

    validateSave: function () {
        return CheckIt(this.validationRules).validate(this.toJSON());
    },

    virtuals: {
        countCheckIns: function () {
            // this property exists due our query in userRepository
            return this.get('check_in_count');
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
        return bcrypt.compare(candidatePassword, this.get('password'));
    },

    setDefaults: function (model, attrs, options) {
        if (!attrs.level && !model.level) {
            model.set('level', 'student');
        }
    }
});

const Users = bookshelf.Collection.extend({
    model: User
});

module.exports = {
    User: bookshelf.model('User', User),
    Users: Users
};
