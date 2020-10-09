const express = require('express');
var cors = require('cors')
const path = require('path');
const chat = require('./Chat')

const app = express();

app.use(cors())

app.get('/api/chat', (req, res) => {
  res.json(chat);
});

// app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
