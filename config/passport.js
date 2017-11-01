const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const userRepo = require('../src/userRepository');

module.exports = (passport) => {

    passport.use('local-login', new LocalStrategy({
            passReqToCallback: true
        },
        (req, username, password, done) => {
            console.log('local strategy call invoked');
            userRepo.getUserByUsername(username, (user) => {
                console.log('passport auth getting user by username');
                if (user.err) {
                    return done(user.err);
                }

                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect username.'));
                }

                user.comparePassword(password, (err, isMatch) => {
                    if (err) {
                        return done(err);
                    }

                    if (isMatch) {
                        return done(null, user);
                    }
                    return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
                });
            });
        }
    ));

    // https://scotch.io/tutorials/easy-node-authentication-setup-and-local
    passport.use('local-signup', new LocalStrategy({
            passReqToCallback: true
        },
        (req, username, password, done) => {
            process.nextTick(() => {
                userRepo.getUserByUsername(username, (existingUser) => {
                    if (existingUser.err) {
                        return done(existingUser.err);
                    } else if (existingUser) {
                        return done(null, false, req.flash('signupMessage', 'That username is already in use'));
                    } else {
                        userRepo.createUser(req.body, newUser => {
                            if (newUser.err) {
                                throw newUser.err;
                            } else {
                                return done(null, newUser)
                            }
                        });
                    }
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};