const uniqid = require("uniqid");

class ChannelsModel {
  constructor(store) {
    this.store = store;
  }

  all() {
    return this.store;
  }

  addChannel(name, creator) {
    const channel = {
      id: uniqid(),
      name,
      creator,
      msgs: [],
      msgCount: 0
    };

    const channels = this.all();

    channels.push(channel);
    return channel;
  }

  getChannel(id) {
    return this.all().find(channel => channel.id === id);
  }

  hasChannel(id) {
    return this.getChannel(id) !== undefined;
  }

  addMessage(message) {
    const { channelId, sender, msg } = message;
    const channel = this.getChannel(channelId);

    if (!channel) {
      return false;
    }

    message = Object.assign(
      {},
      {
        channelId: uniqid(),
        sender,
        msg,
        timestamp: new Date().toString()
      }
    );

    channel.msgs.push(message);

    return message;
  }
}

module.exports = ChannelsModel;
