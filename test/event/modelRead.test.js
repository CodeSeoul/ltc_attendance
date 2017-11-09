require('../test_helper.test');
const Event = require('../../models/Event');
const assert = require('assert');

describe('Event modelRead', () => {

    it('Should find a Event by _id', (done) => {
        const sql = new Event({title: 'sql'});
        sql.save()
            .then(() => Event.findOne({_id: sql.id}))
            .then((result) => {
                assert(String(result._id) === String(sql.id));
                done()
            });
    });

});
