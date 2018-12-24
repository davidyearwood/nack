const express = require('express');
const bodyParser = require('body-parser');
const channels = require('./db/ChannelData');

const app = express();
const port = 3000;
let currentId = channels.length;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getChannel(id) {
  return channels.find(channel => (
    parseInt(channel.id, 10) === parseInt(id, 10)
  ));
}

app.get('/channel', (req, res) => {
  res.json(channels);
});

app.get('/channel/:id', (req, res) => {
  if (!getChannel(req.params.id)) {
    return res.status(404).json({ error: 'Channel not found' });
  }

  return res.json(getChannel);
});

app.get('/channel/:channelId/msg', (req, res) => {
  const channel = getChannel(req.params.channelId);

  if (!channel) {
    return res.status(404).json({ error: 'Channel not found' });
  }

  return res.json(channel.msgs);
});

app.get('/channel/:channelId/msg/:msgId', (req, res) => {
  const { msgId, channelId } = req.params;
  const channel = getChannel(channelId);

  if (!channel) {
    return res.status(404).json({ error: 'Channel not found' });
  }

  const message = channel.msgs.find(msg => parseInt(msg.id, 10) === parseInt(msgId, 10));

  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  return res.json(message);
});

app.post('/channel', (req, res) => {
  const { name, creator } = req.body;
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
    name,
    msg: [],
    creator,
    msgCount: 0,
  };

  channels.push(newChannel);
  currentId += 1;
  return res.status(201).json(newChannel);
});

// app.post('/channel/:channelId/msg', (req, res) => { });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
