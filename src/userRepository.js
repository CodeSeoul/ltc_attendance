const User = require('../models/User').User;
const Users = require('../models/User').Users;

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
            password: reqBody.password,
            level: reqBody.level
        }); // TODO: expand this for safety and remaining fields
    },

    getUser(id) {
        return User.where('id', id).fetch();
    },

    getUserByEmail(email) {
        return User.where('email', email).fetch();
    },

    getUserByUsername(username) {
        console.log('getting user by username');
        return User.where('username', username).fetch();
    },

    updateUser(id, attributesToUpdate) {
        return new User({id: id}).fetch()
            .then(user => {
                return user.save(attributesToUpdate, {patch: true});
            }); // TODO: this is an extra database call, but I'm tired
    },

    deleteUser(id) {
        return User.where('id', id).destroy();
    }

};
