const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
const SALT_WORK_FACTOR = 10;

// http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2 && name.length < 100,
            message: 'Name must be valid length'
        }
    },
    email: {
        type: String,
        unique: [true, 'Email must be unique'],
        validate: {
            validator: (email) => validator.isEmail(email),
            message: 'Email must be valid'
        }
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: String,
        default: 'student',
        enum: ['student', 'instructor', 'admin']
    },
    website: {
        type: String,
        validate: {
            validator: (website) => validator.isURL(website),
            message: 'Website must be valid url'
        }
    },
    hometown: {
        type: String,
        default: 'hometown',
        validate: {
            validator: (hometown) => hometown.length < 100,
            message: 'Hometown must be less than 100 characters'
        }
    },
    description: {
        type: String,
        validate: {
            validator: (description) => description.length < 1000,
            message: 'Description must be less than 1000 characters'
        }
    },
    checkIns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'checkIn'
        }
    ]
});

// Mongoose middleware is not invoked on update() operations, so you must use a save() if you want to update user passwords.
userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// add a comparePassword method with callback to our user model
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.plugin(uniqueValidator);

const User = mongoose.model('user', userSchema)

module.exports = User;
