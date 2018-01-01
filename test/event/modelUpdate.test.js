require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Event = require('../../models/Event').Event;
const assert = require('assert');

describe('Event modelUpdate', () => {
    let baseEvent;

    beforeEach(() => {
        return new Event({
            title: 'Test Event',
            description: 'beginner sql',
            type: 'Workshop',
            created_by: 1
        }).save()
            .then(savedBaseEvent => {
                baseEvent = savedBaseEvent;
            });
    });

    afterEach(() => {
        return knex('event').truncate()
            .then(() => {
                return knex('user').truncate();
            });
    });

    it('Should update Title', () => {
        baseEvent.set('title', 'ruby');
        return baseEvent.save()
            .then(event => {
                assert(event.get('title') === 'ruby', `Title should be "ruby" but got "${event.get('title')}"`);
            })
    });

    it('Should update Description', () => {
        baseEvent.set('description', 'beginner ruby');
        return baseEvent.save()
            .then(event => {
                assert(event.get('description') === 'beginner ruby', `Description should be "beginner ruby" but got "${event.get('description')}"`);
            });
    });

    it('Should update Type', () => {
        baseEvent.set('type', 'hack-night');
        return baseEvent.save()
            .then(event => {
                assert(event.get('type') === 'hack-night', `Type should be "hack-night" but got "${event.get('type')}"`);
            });
    });
});
