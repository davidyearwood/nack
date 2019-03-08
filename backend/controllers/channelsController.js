const validator = require("validator");
const Channel = require("../models/channelsModel");
const store = require("../store");

const ChannelsModel = new Channel(store);

// returns a list of all the channels
exports.channelList = function channelList(req, res) {
  const channels = ChannelsModel.all();

  return res.json(channels);
};

// retrieve channel
exports.channel = function channel(req, res) {
  const { id } = req.params;
  if (!validator.isAlphanumeric(id.toString())) {
    return res.status(404).json({ error: "Not valid ID" });
  }

  const c = ChannelsModel.getChannel(id);

  if (!c) {
    return res.status(404).json({ error: "Channel doesn't exist" });
  }

  return res.json(c);
};

// Retrieve all of the channel's messages
exports.channelMessages = function channelMessages(req, res) {
  const { id } = req.params;

  if (!validator.isAlphanumeric(id)) {
    return res.status(404).json({ error: "Resource not found" });
  }

  const channel = ChannelsModel.getChannel(id);

  if (!channel) {
    return res.status(404).json({ error: "Resource not found" });
  }

  return res.json(channel.msgs);
};

// retrieve's a single message from channel
exports.channelMessage = function channelMessage(req, res) {
  const { channelId, msgId } = req.params;

  if (
    !validator.isAlphanumeric(channelId) ||
    !validator.isAlphanumeric(msgId)
  ) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const channel = ChannelsModel.getChannel(channelId);

  if (!channel) {
    return res.status(404).json({ error: "Channel not found" });
  }

  const message = channel.msgs.find(msg => msg.id.toString() === msgId);

  if (!message) {
    return res.status(404).json({ error: "Message not found" });
  }

  return res.json(message);
};

// create a new channel
exports.addChannel = function addChannel(req, res) {
  const { name, creator } = req.body;

  if (!name || !creator) {
    return res.status(500).json({ error: "Internal Server Error." });
  }

  if (ChannelsModel.getChannelByName(name)) {
    return res.status(409).json({
      error: "The channel you attempted to create already exists."
    });
  }

  const newChannel = ChannelsModel.addChannel(
    validator.escape(name),
    validator.escape(creator)
  );

  return res.status(201).json({ data: newChannel });
};

// create a new message
exports.addMessage = function addMessage(req, res) {
  const { channelId } = req.body;
  const channel = ChannelsModel.getChannel(channelId);

  if (!channel) {
    return res.status(404).json({ error: "Channel doesn't exist" });
  }

  const { sender, msg } = req.body;

  const message = ChannelsModel.addMessage({
    sender: validator.escape(sender),
    msg: validator.escape(msg),
    channelId
  });

  return res.status(201).json(message);
};
