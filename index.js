const express = require('express');
const bodyParser = require('body-parser');
const channels = require('./db/ChannelData');

const app = express();
const port = 3000;
let currentId = channels.length;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/channel', (req, res) => {
  res.json(channels);
});

app.get('/channel/:id', (req, res) => {
  const getChannel = channels.find(channel => (
    parseInt(channel.id, 10) === parseInt(req.params.id, 10)
  ));

  if (!getChannel) {
    res.status(404).json({ error: 'Channel not found' });
  }

  res.json(getChannel);
});

app.post('/channel', (req, res) => {
  if (!req.body.name && !req.body.creator) {
    return res.status(500).json({ error: 'Internal Server Error.' });
  }

  const hasChannel = channels.find(channel => (
    channel.name.toLowerCase() === req.body.name.toLowerCase()
  ));

  if (hasChannel) {
    return res.status(409).json({
      error: 'The channel you attempted to create already exists.',
    });
  }

  const newChannel = {
    id: currentId + 1,
    name: req.body.name,
    msg: [],
    creator: req.body.creator,
    msgCount: 0,
  };

  channels.push(newChannel);
  currentId += 1;
  return res.status(201).json(newChannel);
});

// app.post('/channel/:channelId/msg', (req, res) => { });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
