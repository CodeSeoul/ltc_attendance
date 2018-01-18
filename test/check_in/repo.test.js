require('../test_helper.test');
const knex = require('../../config/bookshelf').knex;
const Repo = require('../../src/checkInRepository');
const Event = require('../../models/Event').Event;
const User = require('../../models/User').User;
const CheckIn = require('../../models/checkIn').CheckIn;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

describe('CheckIn Repo routes', () => {
    let joe, baseEvent, baseCheckIn;

    beforeEach(() => {
        return new User({
            username: 'joe',
            email: 'joe@mail.com',
            password: 'somepass',
            level: 'student'
        }).save()
            .then(savedUser => {
                joe = savedUser;
                return new Event({
                    title: 'Test Event',
                    description: 'we\'ll do some stuff!',
                    type: 'workshop',
                    created_by: savedUser.get('id')
                }).save()
                    .then(savedEvent => {
                        return new CheckIn({
                            user_id: savedUser.get('id'),
                            event_id: savedEvent.get('id')
                        }).save()
                            .then(savedCheckIn => {
                                joe = savedUser;
                                baseEvent = savedEvent;
                                baseCheckIn = savedCheckIn;
                            });
                    });
            });
    });

    afterEach(() => {
        return knex('user').truncate();
    });

    it('should create new check_in with createCheckIn()', () => {
        return new User({
            username: 'jane',
            email: 'jane@bogus.com',
            password: 'somepass',
            level: 'student'
        }).save()
            .then(savedUser => {
                return Repo.createCheckIn(savedUser, baseEvent)
                    .then(savedCheckIn => {
                        expect(savedCheckIn.get('user_id')).to.be.eql(savedUser.get('id'));
                        expect(savedCheckIn.get('event_id')).to.be.eql(baseEvent.get('id'));
                    });
            });
    });

    it('should retrieve the correct check_in with getCheckInByUserIdAndEventId()', () => {
        return Repo.getCheckInByUserIdAndEventId(joe, baseEvent)
            .then(retrievedCheckIn => {
                expect(retrievedCheckIn.get('user_id')).to.be.eql(joe.get('id'));
                expect(retrievedCheckIn.get('event_id')).to.be.eql(baseEvent.get('id'));
            });
    });
})
;
