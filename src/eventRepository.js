const Event = require('../models/Event').Event;

module.exports = {
    getEvents() {
        return Event.forge().orderBy('created_at', 'DESC').fetchAll({withRelated: ['createdBy', 'checkIns']});
    },

    createEvent(reqBody, creator) {
        return new Event().save({
            title: reqBody.title,
            description: reqBody.description,
            type: reqBody.type,
            created_by: creator,
            instructors: reqBody.instructors
        });
    },

    getEvent(id) {
        return Event.where('id', id).fetch();
    },

    getEventWithFullDetails(id) {
        return Event.where('id', id).fetch({withRelated: ['instructors', 'createdBy', 'checkIns']});
    },

    updateEvent(id, attributesToUpdate) {
        return new Event({'id': id}).save(attributesToUpdate, {patch: true});
    },

    deleteEvent(id) {
        return Event.where('id', id).destroy();
    }
};
