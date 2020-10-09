const express = require('express');
const uuid = require('uuid');
const moment = require('moment');
var cors = require('cors')
const chat = require('./Chat')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get Entire chat
app.get('/api/chat', (req, res) => {
  res.json(chat);
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

  chat.push(newMessage);

  const response = {
    id: uuid.v4(),
    type: 'text',
    title: 'We hear you',
    author: 'bot',
    date: moment().format('l'),
  }

  res.json(response);
  chat.push(response);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
