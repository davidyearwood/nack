const fs = require("fs");

const path = `${__dirname}/db`;

const get = function get(cb) {
  fs.readFile(`${path}/channel.json`, "utf-8", (err, data) => {
    cb(err, data);
  });
};

// Manages Channel Data
// Get the data
// Update the data
// Add the data
class Channel {
  static find(name, cb) {
    get((err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(err, data.find(item => item.name === name));
      }
    });
  }

  static all(cb) {
    fs.readFile(`${__dirname}/db/channel.json`, "utf-");
  }

  static add(channel, cb) {}
}

module.exports = Channel;
