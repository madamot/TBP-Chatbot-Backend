const express = require('express');
const path = require('path');

const app = express();

const convo = [
  {
      id: '1',
      type: 'text',
      title: 'Hello World!',
      platform: 'messenger',
      author: 'bot',
      date: '14-07-20',
      updatedAt: new Date(2018, 0, 1, 9, 0),
    },
    {
      id: '2',
      type: 'text',
      title: 'How are we?',
      platform: 'messenger',
      author: 'bot',
      date: '14-07-20',
      updatedAt: new Date(2018, 0, 1, 9, 0),
      button: [
        {
          id: '1',
          title: 'my button',
        },
      ],
    },
    {
      id: '3',
      type: 'image',
      imgSrc: 'https://images.prismic.io/madamotportfolio/c5372164-649c-438c-aa94-ba4533454a3a_IMG_5179.jpg?auto=compress,format',
      platform: 'messenger',
      author: 'bot',
    },
    {
      id: '1',
      type: 'carousel',
      carouselData: [
        {
          id: '1',
          title: 'Title',
          subtitle: 'Subtitle',
          imgSrc: 'https://images.prismic.io/madamotportfolio/c5372164-649c-438c-aa94-ba4533454a3a_IMG_5179.jpg?auto=compress,format',
          platform: 'messenger',
          author: 'bot',
          button: [
            {
              id: '1',
              title: 'my button',
            },
          ],
        },
        {
          id: '2',
          title: 'Title',
          subtitle: 'Subtitle',
          imgSrc: 'https://images.prismic.io/madamotportfolio/c5372164-649c-438c-aa94-ba4533454a3a_IMG_5179.jpg?auto=compress,format',
          platform: 'messenger',
          author: 'bot'
        },
        {
          id: '3',
          title: 'Title',
          subtitle: 'Subtitle',
          imgSrc: 'https://images.prismic.io/madamotportfolio/c5372164-649c-438c-aa94-ba4533454a3a_IMG_5179.jpg?auto=compress,format',
          platform: 'messenger',
          author: 'bot',
          button: [
            {
              id: '1',
              title: 'my button',
            },
          ],
        },
        {
          id: '4',
          title: 'Title',
          subtitle: 'Subtitle',
          imgSrc: 'https://images.prismic.io/madamotportfolio/c5372164-649c-438c-aa94-ba4533454a3a_IMG_5179.jpg?auto=compress,format',
          platform: 'messenger',
          author: 'bot'
        },
      ]
    }
];

app.get('/api/chat', (req, res) => {
  res.json(convo);
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
