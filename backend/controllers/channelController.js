const Channel = require("../models/channel");
const store = require("../store");
const validator = require("validator");

const ChannelModel = new Channel(store);

// returns a list of all the channels
exports.channelList = function(req, res) {
  const channels = ChannelModel.all(); 

  return res.json(channels);
};

exports.channel = function(req, res) {
  const channel = ChannelModel.getChannel(req.params.id);
  
  if (!channel) {
    return res.status(404).json({ error: "Resource not found"});
  }
  
  return res.json(channel);
}

exports.channelMessages = function(req, res) {
  const channel = ChannelModel.getChannel(req.params.id);
  
  if (!channel) {
    return res.status(404).json({error: "Resource not found"});
  }
  
  return res.json(channel.msgs);
}


exports.channelMessage = function(req, res) {
   const channel = ChannelModel.getChannel(req.params.channelId);
   
   if (!channel) {
     return res.status(404).json({error: "Resource not found"});
   }
   
   const message = channel.msgs.find(msg => msg.id === req.params.messageId);
   
   if (!message) {
      return res.status(404).json({error: "Resource not found"});
   }
   
   return res.json(message);
}