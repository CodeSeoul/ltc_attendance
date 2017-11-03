const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User').User;
const userRepo = require('../src/userRepository');

module.exports = (passport) => {

    passport.use('local-login', new LocalStrategy({
            passReqToCallback: true
        },
        (req, username, password, done) => {
            console.log('local strategy call invoked');
            const user = userRepo.getUserByUsername(username)

            const passwordCompare = user.then(u => {
                console.log('password compare user then promise');
                const result = u.comparePassword(password);
                console.log('result:', result);
                return result;
            });

            return Promise.all([user, passwordCompare]).then((promiseResult) => {

                const userResult = promiseResult[0];
                const passwordResult = promiseResult[1];

                if (!userResult) {
                    console.log('calling done no user');
                    return done(null, false, {message: 'Incorrect username.'});
                }

                if (passwordResult) {
                    console.log('calling done compare password match');
                    return done(null, user);
                }

                console.log('calling done is not password compare match');
                return done(null, false, {message:'Incorrect password.'});

            }).catch(err => {
                console.log('error logging in');
                console.log(err);
                return done(err);
            });
        }
    ));

// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
    // TODO: get flash to work nicely
    // see this https://stackoverflow.com/questions/26403853/node-js-authentication-with-passport-how-to-flash-a-message-if-a-field-is-missi
    passport.use('local-signup', new LocalStrategy({
            passReqToCallback: true
        },
        (req, username, password, done) => {
            console.log('starting signup');
            userRepo.getUserByUsername(username)
                .then(existingUser => {
                    console.log('got existing user');
                    if (existingUser) {
                        console.log('user exists');
                        return done(null, false, {message: 'That username is already in use'});
                    } else {
                        console.log('returning createUser promise');
                        return userRepo.createUser(req.body);
                    }
                })
                .then(newUser => {
                    console.log('working on createUser promise');
                    if (newUser instanceof User) {
                        console.log('we got newly created user');
                        console.log(newUser);
                        return done(null, newUser);
                    } else {
                        console.log('we got something that wasn\'t User');
                        console.log(typeof newUser);
                        console.log(newUser instanceof User);
                        console.log(newUser);
                        return newUser;
                    }
                })
                .catch(err => {
                    console.log('error signing up:', err);
                    return done(err)
                });
        })
    );

    passport.serializeUser((user, done) => {
        console.log('calling done serialize');
        return done(null, user.id);
    });

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