const bookshelf = require('../config/bookshelf').bookshelf;
const validator = require('validator');
const checkit = require('checkit');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const CheckIn = require('./checkIn');

// TODO: Add validations
class User extends bookshelf.Model {

    constructor(...args) {
        super(...args);
        this.on('saving', this.hashPassword, this);
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

    // https://wesleytsai.io/2015/07/28/bookshelf-bcrpyt-password-hashing/
    hashPassword(model, attrs, options) {
        return new Promise((resolve, reject) => {
            if (!model.hasChanged('password')) return resolve.model.attributes.password;

            bcrypt.hash(model.attributes.password, SALT_WORK_FACTOR)
                .then(hashedPassword => {
                    model.set('password', hashedPassword);
                    resolve(hashedPassword);
                })
                .catch(err => {
                    console.log('Error salting and hashing password:', err);
                    reject(err);
                });
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
