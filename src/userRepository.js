const User = require('../models/User').User;
const Users = require('../models/User').Users;

module.exports = {
    getUsers() {
        return Users.query(queryBuilder => {
            queryBuilder.join('check_in', 'user.id', 'check_in.user_id');
            queryBuilder.groupBy('user.id');
            queryBuilder.select('user.*');
            queryBuilder.count('* as check_in_count');
            queryBuilder.orderBy('check_in_count', 'desc');
        }).fetch();
    },

    createUser(reqBody) {
        return new User({
            username: reqBody.username,
            email: reqBody.email,
            password: reqBody.password,
            checkIns: []
        }).save();
    },

    getUser(id) {
        return User.where('id', id).fetch();
    },

    getUserByEmail(email) {
        return User.where('email', email).fetch();
    },

    getUserByUsername(username) {
        return User.where('username', username).fetch();
    },

    updateUser(id, user) {
        return User.where('id', id).save(user, {patch: true});
    },

    deleteUser(id) {
        return User.where('id', id).destroy();
    }

};
