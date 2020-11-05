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

/**
 * Testing post user endpoint
 */
describe('POST /api/chat/:id', function () {
    let data = {
        "id": "user001",
        "type": "text",
        "title": "dummy test",
        "author": "bot",
        "date": "10/23/2020",
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/api/chat/user001')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post user endpoint
 */
describe('POST /api/chat/:id', function () {
    let data = {
        "id": "user001",
        "type": "text",
        "title": "",
        "author": "bot",
        "date": "10/23/2020",
    }
    it('When no text is posted respond with 400 not created', function (done) {
        request(app)
            .post('/api/chat/user001')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({ msg: 'No text in the message sent' })
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
