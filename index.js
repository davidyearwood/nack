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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
