const bookshelf = require('../config/bookshelf').bookshelf;
const validator = require('validator');
const checkit = require('checkit');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const CheckIn = require('./checkIn');

// http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt

class User extends bookshelf.Model {

    constructor() {
        super();
        this.on('saving', this.hashPassword);
    }

    get tableName() {
        return 'user';
    }

    get hasTimestamps() {
        return true;
    }

    get hidden() {
        return ['password'];
    }

    get checkIns() {
        return this.hasMany('CheckIn', 'user_id');
    }

    get instructingCourses() {
        return this.belongsToMany('Course', 'course_instructor', 'user_id');
    }

    get virtuals() {
        return {
            countCheckIns: () => {
                return this.get('checkIns').count();
            }
        }
    }

    hashPassword() {
        const user = this;

        if (!user.hasChanged('password')) return;

        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(user.password, salt);
            })
            .then(hashedPassword => {
                user.password = hashedPassword;
            })
            .catch(err => {
                console.log('Error salting and hashing password:', err);
                throw err;
            });
    }

    comparePassword(candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
    };
}

class Users extends bookshelf.Collection {
    get model() {
        return User;
    }
}

module.exports = {
    User: User,
    Users: Users
};
