const express = require('express');
const redis = require('redis');
const uuid = require('uuid');
const moment = require('moment');
var cors = require('cors')
const chat = require('./Chat')

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

client.on('connect', () => {
  console.log('Connected to Redis...');
});

var multi = client.multi()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Get Previous chat
app.get('/api/chat/:id', (req, res) => {
  // req.params = { id: id }
  var id = req.params.id;

  const convo = client.lrange(id, 0, -1, (err, obj) => {
    if(!obj || obj.length == 0) {
      res.status(404).json({error: 'user does not exist'});
    } else {
      let convo = [];

      for (var i = 0; i < obj.length; i++) {
        const conversation = JSON.parse(obj[i]);
        convo.push(conversation);
      }
      res.set('Content-Type', 'application/json');
      res.json(convo);

      console.log(convo.length);
    }
  });

  // res.json(conversation);
});

// Create Message
app.post('/api/chat/:id', (req, res) => {

var id = req.params.id;

  const newMessage = {
    "id": id,
    "type": "text",
    "title": req.body.title,
    "author": "user",
    "date": moment().format('l'),
  }

  if(!newMessage.title) {
    return res.status(400).json({ msg: 'No text in the message sent' })
  }

  // const jsonNewMessage = newMessage;

  // conversation.push(newMessage);

  let stringified = JSON.stringify(newMessage);
  // var parsedObj = JSON.parse(jsonNewMessage);


  client.rpush(id, stringified);
  client.ltrim(id, -50, -1);


  const response = {
    "id": uuid.v4(),
    "type": "text",
    "title": "We hear you",
    "author": "bot",
    "date": moment().format('l'),
  }

  res.status(201).json(response);

  let stringifiedAgain = JSON.stringify(response);

  client.rpush(id, stringifiedAgain);
  client.ltrim(id, -50, -1);

});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app
