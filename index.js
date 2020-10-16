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

const conversation = [];

// Get Previous chat
app.get('/api/chat', (req, res) => {
  const id = 'user001';

  client.get(id, (err, obj) => {
    if(!obj) {
      console.log('no previous chat history');
    } else {
      const jsonify = JSON.parse(obj);
      res.json([jsonify]);
    }
  });

  // res.json(conversation);
});

// Create Message
app.post('/api/chat', (req, res) => {
  const newMessage = {
    id: uuid.v4(),
    type: 'text',
    title: req.body.title,
    author: 'user',
    date: moment().format('l'),
  }

  if(!newMessage.title) {
    return res.status(400).json({ msg: 'No text in the message sent' })
  }

  conversation.push(newMessage);

  const response = {
    id: uuid.v4(),
    type: 'text',
    title: 'We hear you',
    author: 'bot',
    date: moment().format('l'),
  }

  res.json(response);
  conversation.push(response);

});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
