const Event = require('../models/Event').Event;

module.exports = {
    getEvents() {
        return Event.forge().orderBy('created_at', 'DESC').fetchAll({withRelated: ['createdBy']});
    },

    createEvent(reqBody, creator) {
        return new Event().save({
            title: reqBody.title,
            description: reqBody.description,
            created_by: creator
        });
    },

    getEvent(id) {
        return Event.where('id', id).fetch();
    },

    getEventWithFullDetails(id) {
        return Event.where('id', id).fetch({withRelated: ['instructors', 'createdBy']});
    },

    updateEvent(id, event) {
        return Event.where('id', id).save(event, {patch: true});
    },

    deleteEvent(id) {
        return Event.where('id', id).destroy();
    }
};
