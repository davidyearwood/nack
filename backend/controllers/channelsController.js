const validator = require("validator");
const Channel = require("../models/channel");
const store = require("../store");

const ChannelModel = new Channel(store);

// returns a list of all the channels
exports.channelList = function channelList(req, res) {
  const channels = ChannelModel.all();

  return res.json(channels);
};

// retrieve channel
exports.channel = function channel(req, res) {
  const { id } = req.params;

  if (!validator.isAlphanumeric(id)) {
    return res.status(404).json({ error: "Resource not found" });
  }

  const c = ChannelModel.getChannel(req.params.id);

  if (!c) {
    return res.status(404).json({ error: "Resource not found" });
  }

  return res.json(c);
};

// Retrieve all of the channel's messages
exports.channelMessages = function channelMessages(req, res) {
  const { id } = req.params;

  if (!validator.isAlphanumeric(id)) {
    return res.status(404).json({ error: "Resource not found" });
  }

  const channel = ChannelModel.getChannel(id);

  if (!channel) {
    return res.status(404).json({ error: "Resource not found" });
  }

  return res.json(channel.msgs);
};

// retrieve's a single message from channel
exports.channelMessage = function channelMessage(req, res) {
  const { channelId, messageId } = req.params;

  if (
    !validator.isAlphanumeric(channelId) ||
    !validator.isAlphanumeric(messageId)
  ) {
    return res.status(404).json({ error: "Resource not found" });
  }

  const channel = ChannelModel.getChannel(req.params.channelId);

  if (!channel) {
    return res.status(404).json({ error: "Resource not found" });
  }

  const message = channel.msgs.find(msg => msg.id === req.params.messageId);

  if (!message) {
    return res.status(404).json({ error: "Resource not found" });
  }

  return res.json(message);
};

exports.createMessage = function createMessage() {};
