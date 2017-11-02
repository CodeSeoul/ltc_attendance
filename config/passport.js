const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const userRepo = require('../src/userRepository');

module.exports = (passport) => {

    passport.use('local-login', new LocalStrategy({
            passReqToCallback: true
        },
        (req, username, password, done) => {
            console.log('local strategy call invoked');
            const user = userRepo.getUserByUsername(username)
                .then(user => {
                    console.log('passport auth getting user by username');

                    if (!user) {
                        return done(null, false, req.flash('loginMessage', 'Incorrect username.'));
                    }

                    return user;
                })
                .catch(err => {
                    return done(err)
                });

            if (typeof user !== User) {
                return user;
            }

            user.comparePassword(password)
                .then(isMatch => {
                    if (isMatch) {
                        return done(null, user);
                    }
                    return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
                });
        }
    ));

// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
    passport.use('local-signup', new LocalStrategy({
            passReqToCallback: true
        },
        (req, username, password, done) => {
            process.nextTick(() => {
                userRepo.getUserByUsername(username)
                    .then(existingUser => {
                        if (existingUser) {
                            return done(null, false, req.flash('signupMessage', 'That username is already in use'));
                        } else {
                            return userRepo.createUser(req.body);
                        }
                    })
                    .then(newUser => {
                        return done(null, newUser);
                    })
                    .catch(err => {
                        return done(err)
                    });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userRepo.getUser(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => done(err, null));
    });
}
;