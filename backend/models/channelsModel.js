const uniqid = require("uniqid");
const format = require("date-fns/format");

class ChannelsModel {
  constructor(store, limit = 100) {
    this.store = store;
    this.LIMIT = limit;
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
    return this.all().find(channel => channel.id.toString() === id.toString());
  }

  getChannelByName(name) {
    return this.all().find(channel => channel.name === name);
  }

  hasChannel(id) {
    return this.getChannel(id) !== undefined;
  }

  addMessage(message) {
    const { channelId, sender, msg, name, type } = message;
    const channel = this.getChannel(channelId);

    if (!channel) {
      return false;
    }

    message = Object.assign(
      {},
      {
        id: uniqid(),
        channelId,
        sender,
        msg,
        type,
        timestamp: new Date().toISOString()
      }
    );

    if (channel.msgs >= this.LIMIT) {
      channel.msgs.shift();
      channel.msgCount -= 1;
    }

    channel.msgs.push(message);
    channel.msgCount += 1;
    return message;
  }
}

module.exports = ChannelsModel;
