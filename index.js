const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/channel', (req, res) => {
  fs.readFile(`${__dirname}/db/channel.json`, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      // eslint-disable-next-line no-console
      console.log(err);
    }
    const parsedData = JSON.parse(data);
    res.json(parsedData);
  });
});

app.get('/channel/:id', (req, res) => {
  fs.readFile(`${__dirname}/db/channel.json`, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      // eslint-disable-next-line no-console
      console.log(err);
    }

    const channels = JSON.parse(data);

    const item = channels.find(channel => parseInt(channel.id, 10) === parseInt(req.params.id, 10));

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Channel doesn\'t exist' });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
