const fs = require('fs');

const path = `${__dirname}/db`;

const get = function get(cb) {
  fs.readFile(`${path}/channel.json`, 'utf-8', (err, data) => {
    cb(err, data);
  });
};

class Channel {
  static find(err, cb) {
    fs.readFile(`${__dirname}/db/channel.json`, 'utf-8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        // eslint-disable-next-line no-console
        console.log(err);
      }
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    });
  }

  static all(cb) {
    fs.readFile(`${__dirname}/db/channel.json`, 'utf-')
  }
}

module.exports = Channel;
