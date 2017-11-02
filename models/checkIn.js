const bookshelf = require('../config/bookshelf').bookshelf;

class CheckIn extends bookshelf.Model {

    get tableName() {
        return 'check_in';
    }

    get hasTimestamps() {
        return true;
    }

    get user() {
        return this.belongsTo('User', 'user_id');
    }

    get course() {
        return this.belongsTo('Course', 'course_id');
    }
}

class CheckIns extends bookshelf.Collection {
    get model() {
        return CheckIn;
    }
}

module.exports = {
    CheckIn: CheckIn,
    CheckIns: CheckIns
};
