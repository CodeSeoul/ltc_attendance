const bookshelf = require('../config/bookshelf').bookshelf;

const CheckIn = bookshelf.Model.extend({

    tableName: 'check_in',
    hasTimestamps: true,

    user: () => {
        return this.belongsTo('User', 'user_id');
    },

    event: () => {
        return this.belongsTo('Course', 'course_id');
    },

    virtuals: {

        createdAt: {
            get: () => {
                return this.get('created_at');
            },
            set: newDate => {
                this.set('created_at', newDate);
            }
        },
        updatedAt: {
            get: () => {
                return this.get('updated_at');
            },
            set: newDate => {
                this.set('updated_at', newDate)
            }
        }
    }

const CheckIns = bookshelf.Collection.extend({
    model: CheckIn
});

module.exports = {
    CheckIn: CheckIn,
    CheckIns: CheckIns
};
