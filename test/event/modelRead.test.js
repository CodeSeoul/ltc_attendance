require('../test_helper.test');
const Event = require('../../models/Event').Event;
const assert = require('assert');

describe('Event modelRead', () => {

    it('Should find a Event by _id', (done) => {
        const baseEvent = new Event({title: 'Test Event'});
        baseEvent.save()
            .then(() => Event.where({id: baseEvent.id}).fetch())
            .then(result => {
                assert(result.id === baseEvent.id);
                done()
            })
            .catch(err => done(err));
    });

});
