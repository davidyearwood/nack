const Channel = require("../models/channel");

// returns a list of all the channels
exports.channels = function(req, res) {
  res.json(Channel.all());
};

// returns a list of all the channels 
// particular field value
exports.channelsX = function(req, res) {
  const { query } = req;
  
  if ("fields" in query) {
    
  }
}