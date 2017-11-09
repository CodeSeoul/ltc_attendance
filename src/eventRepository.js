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
            created_by: creator
        });
    },

    getEvent(id) {
        return Event.where('id', id).fetch();
    },

    getEventWithFullDetails(id) {
        return Event.where('id', id).fetch({withRelated: ['instructors', 'createdBy', 'checkIns']});
    },

    updateEvent(id, event) {
        return Event.where('id', id).save(event, {patch: true});
    },

    deleteEvent(id) {
        return Event.where('id', id).destroy();
    }
};
