const User = require('../models/user').User;
const Users = require('../models/user').Users;

module.exports = {
    getUsers() {
        return Users.query(queryBuilder => {
            queryBuilder.leftJoin('check_in', 'user.id', 'check_in.user_id');
            queryBuilder.groupBy('user.id');
            queryBuilder.select('user.*');
            queryBuilder.count('* as check_in_count');
            queryBuilder.orderBy('check_in_count', 'desc');
        }).fetch();
    },

    createUser(reqBody) {
        return new User().save({
            username: reqBody.username,
            email: reqBody.email,
            password: reqBody.password
        });
    },

    getUser(id) {
        return User.where('id', id).fetch();
    },

    getUserByUsername(username) {
        console.log('getting user by username');
        return User.where('username', username).fetch();
    },

    updateUser(id, attributesToUpdate) {
        return new User({id: id}).save(attributesToUpdate, {patch: true});
    },

    deleteUser(id) {
        return User.where('id', id).destroy();
    }

};
