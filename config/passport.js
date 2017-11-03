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

            const passwordCompare = user.then(u => {
                return u.comparePassword(password)
            });

            return Promise.all([user, passwordCompare]).then((userResult, passwordResult) => {

                console.log('userResult:');
                console.log(userResult);
                console.log('passwordResult:');
                console.log(passwordResult);

                if (!userResult) {
                    console.log('calling done no user');
                    return done(null, false, req.flash('loginMessage', 'Incorrect username.'));
                }

                if (passwordResult) {
                    console.log('calling done compare password match');
                    return done(null, user);
                }

                console.log('calling done is not password compare match');
                return done(null, false, req.flash('loginMessage', 'Incorrect password.'));

            }).catch(err => {
                console.log('error logging in');
                console.log(err);
                return done(err);
            });
        }
    ));

// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
    passport.use('local-signup', new LocalStrategy({
            passReqToCallback: true
        },
        (req, username, password, done) => {
            userRepo.getUserByUsername(username)
                .then(existingUser => {
                    if (existingUser) {
                        return done(null, false, req.flash('signupMessage', 'That username is already in use'));
                    } else {
                        return userRepo.createUser(req.body);
                    }
                })
                .then(newUser => {
                    if (typeof newUser === User) {
                        return done(null, newUser);
                    } else {
                        return newUser;
                    }
                })
                .catch(err => {
                    return done(err)
                });
        })
    );

    /*passport.serializeUser((user, done) => {
        console.log('calling done serialize');
        return done(null, user.id);
    });*/

    passport.deserializeUser((id, done) => {
        return userRepo.getUser(id)
            .then(user => {
                console.log('calling done deserialize success');
                return done(null, user);
            })
            .catch(err => {
                console.log('calling done deserialize fail');
                return done(err, null)
            });
    });
}
;