require('../test_helper.test');
const Event = require('../../models/Event');
const assert = require('assert');

describe('Event modelDestroy', () => {
    beforeEach((done) => {
        const sql = new Event({title: 'sql'})
        sql.save()
            .then(() => done());
    });
    afterEach((done) => {
        Event.collection.drop();
        done();
    });

    it('Should destroy event record', (done) => {
        const ruby = new Event({title: 'ruby'})
        ruby.save()
            .then(() => Event.remove({title: 'sql'}))
            .then(() => Event.find({}))
            .then((results) => {
                assert(results.length === 1);
                assert(results[0].title === 'ruby');
                done()
            });
    });
});
