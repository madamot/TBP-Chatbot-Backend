const request = require('supertest');
const app = require('../index');


//==================== user chat API test ====================

/**
 * Testing get a user endpoint by giving an existing user
 */
describe('GET /api/chat/:id', function () {
    it('respond with json containing all the messages for that user', function (done) {
        request(app)
            .get('/api/chat/user001')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


/**
 * Testing get a user endpoint by giving a non-existing user
 */
describe('GET /api/chat/:id', function () {
    it('respond with json user does not exist', function (done) {
        request(app)
            .get('/api/chat/idisnotexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect({error: 'user does not exist'})
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
