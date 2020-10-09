const express = require('express');
const path = require('path');
const chat = require('./Chat')

const app = express();

app.get('/api/chat', (req, res) => {
  res.json(chat);
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
